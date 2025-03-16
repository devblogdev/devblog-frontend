import axios from 'axios'
import { difference } from '../components/utilities/setsFunctions';
import { imgurUploadFile, imgurDeleteFile  } from '../services/imgurImageService';

// CODE FOR MANAGING IMAGES; MANAGES POSTS' COVER IMAGE AND USER PROFILE IMAGE
    // <----- START ------->

const token = localStorage.getItem('token');

// Not necessary (or does not work for the case when the albums need to used inside 
// "uploadCallback" in PsotEditor; after dispatching to set the values for the albums,
// "uploadCallback" still reads undefined for value of the updated redux variable, namely, imgurAlbums); 
// using environment variables instead; see images reducer
// export const fetchImgurAlbums = () => {
//     return async (dispatch) => {
//         try {
//             const albumIds = await imgurRequestAlbums();
//             dispatch( {type: 'REGISTER_IMGUR_ALBUMS', payload: albumIds } );
//         } catch(error) {
//             console.log('Error fetching albums from ImgurAPI', error)
//         }
//     }
// }

const uploadImage =  async (file, album) => {
    if (file && token && album) {
        console.log("upload image called")
        try {
            const response = await imgurUploadFile(file, album)
            // 'images_attributes' array will be later processed by Rails backend API; do not change the name 'images_attributes', it is required by Rails API
            const images_attributes = [{
                name: file.name,
                size: file.size,
                url: response.link,
                imgur_delete_hash: response.deletehash
            }]
            console.log(response);
            return images_attributes
        } catch(error) { 
            console.log(error) 
            return []
        }
    } return []
}

const deleteImage = async (postImage) => {
    if (token) {
        console.log("'Delete image' called", postImage)
        await imgurDeleteFile(postImage.imgur_delete_hash)
            .catch((error) => {
                console.error('Error:', error);
                return [postImage]
            });
        // This empty array response will be later processed by Rails backend API; an empty erray will let Rails know 
        // that the 'images_attributes' array is empty and, therefore, if there is an image on the associated post or user, the image object will be deleted
        return []
    } return []
}

const updateImage = async (postImage, imageData, album) => {
    // create a new image with the new file (imageData), and delete the old image (postImage)
    if (token && album) {
        let newerImage;
        try {
            console.log("update image called")
            newerImage = await imgurUploadFile(imageData, album)
        } catch(error) {
            console.log('Error while replacing image', error) 
            return [postImage]
        }
        const images_attributes = [{
            name: imageData.name,
            size: imageData.size,
            url: newerImage.link,
            imgur_delete_hash: newerImage.deleteHash
        }]
        try {
            await imgurDeleteFile(postImage.imgur_delete_hash)
        } catch(error) {
            console.log('Old image could not be deleted', error)
        }
        return images_attributes
    } return []
}

export function manageImageForNewDraftOrPost(imageData, album) {
    // returns a promise; promise is resolved in Post Editor
    return uploadImage(imageData, album)
}

export function manageImageForDraftOrPost(currentPostOrUser, imageState, album) {
    // This function may return a promise; promise is resolved in Post Editor
    console.log("Image manager called")
    let images = currentPostOrUser.images
    let imageData = imageState
    // If the post or user has an image on record, and there no image included in post editor or user profile, delete the post's or user's record image
    if (images[0] !== undefined && imageData === undefined) {
        return deleteImage(images[0])
    // If the post or user has an image on record, and there is an image included in post editor or user profile, if there is a difference in file name or size, replace the post's or user's record image; otherwise, leave the current record's image
    } else if (images[0] !== undefined && imageData !== undefined) {
        if ( images[0].name !== imageData.name || images[0].size !== imageData.size ) {
            return updateImage(images[0], imageData, album)
        } return [images[0]]
    // If the post or user has no image on record and there is an image included in post editor or user profile, upload the image to Amazon S3
    } else if (images[0] === undefined && imageData !== undefined) {
        return uploadImage(imageData, album)
    } return []
}

    // <----- END ------->


// CODE FOR MANAGING POST'S BODY IMAGES WHEN UPLOADED USING THE POST EDITOR'S UPLOAD IMAGE FEATURE;
// IMAGES ARE UPLOADED TO AN IMGUR BUCKET; CODE SENDS IMAGES' URLS TO RUBY ON RAILS BACKEND SO BACKEND TAKES CARE OF DESTROYING THE IMAGES IN IMGUR BUCKET
// CODE ALSO MANAGEES THE IMAGES REDUX STORE
    // <----- START ------->

// helper function
export function extractBodyImages(data) {
    const entityMapArray = Object.values(data.entityMap);
    const imagesUrls = new Set();
    if(entityMapArray.length) {
        entityMapArray.forEach( entity => {
            if(entity.type === "IMAGE") {
                const src = entity.data.src
                if (src.includes("i.imgur.com/")) {
                    imagesUrls.add(src)
                }
            }
        })
    }
    return imagesUrls;
}

export function registerDraftOrPostBodyImages(data, state) {
    return async (dispatch) => {
        console.log("register images called")
        const images = extractBodyImages(data);   //'images' is a Set, not an array
        if(images.size) {
            if(state.type === "initial") {
                dispatch({ type: "REGISTER_IMAGES", payload: images } )
                console.log(`${images.size} images registered in initial states`) 
            } 
            else if(state.type === "final") {
                dispatch({ type: "REGISTER_FINAL_STATE_IMAGES", payload: images } )
                console.log(`${images.size} images registered in final state`) 
            }
            
        } else  {
            console.log("No images registered")
        }
    }
}

export function scheduleImagesForDestruction(initialStateImages, finalStateImages) {
    const initial = initialStateImages;
    const final = finalStateImages;
    console.log("Initial statte images in images schdeuler", initial)
    // if there are registered images
    if (initial.size) {
        return new Promise((resolve, reject) => {            
            setTimeout( () => {
                const markedForDestruction = difference(initial, final);
                console.log("Marked for destruction", markedForDestruction)
                if (markedForDestruction) {                           // convert the set into an array
                    axios.post("/images/schedule-for-destruction", {urls: [...markedForDestruction]})
                        .then(resp => resolve(console.log("Image destruction scheduliing successful")))
                        .catch(error => resolve(console.log(error)))
                } 
                else {
                    resolve(console.log("No scheduled images for destruciton"))
                }
            }, 1000)
            console.log("hello!!!!")
        })
    }
    else console.log("No scheduled images for destruciton")
}

// <----- END ------->



