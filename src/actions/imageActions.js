import S3 from 'react-aws-s3'
// import axios from 'axios'
// import auth from '../components/security/auth'
import ShortUniqueId from 'short-unique-id';

const suid = new ShortUniqueId({ length: 16 });

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const ReactS3Client = new S3(config)

const token = localStorage.getItem('token')

const uploadImage =  async (file, isProfileImage) => {
    // Upload the image to Amazon S3 bucket
    if (file && token) {
        console.log("upload image called")
        try {
            let response
            if (!isProfileImage) {
                response = await ReactS3Client.uploadFile(file)
            } else {
                response = await ReactS3Client.uploadFile(file, `profileimages/${suid()}`)
            }
            // 'images_attributes' array will be later processed by Rails backend API; do not change the name 'images_attributes', it is required by Rails API
            const images_attributes = [{
                name: file.name,
                size: file.size,
                url: response.location,
                s3key: response.key
            }]
            console.log(images_attributes)
            return images_attributes
        } catch(error) { 
            console.log(error) 
            return []
        }
    } return []
}

const deleteImage = async (postImage) => {
    // Delete the image from Amazon S3 bucket
    if (token) {
        console.log("delete image called")
        await ReactS3Client.deleteFile(postImage.s3key)
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log("Delete image from S3 was called")
        // This empty array response will be later processed by Rails backend API; an empty erray will let Rails know 
        // that the 'images_attributes' array is empty and, therefore, if there is an image on the associated post or user, the image object will be deleted
        return []
    } return []
}

const updateImage = async (postImage, imageData) => {
    // Update the image in Amazon S3 bucket
    if (token) {
        console.log("update image called")
        await ReactS3Client.uploadFile(imageData, postImage.s3key)
        .catch(error => { 
            console.log(error) 
            return [postImage]
        })
        const images_attributes = [{
            name: imageData.name,
            size: imageData.size,
            url: postImage.url,
            s3key: postImage.s3key
        }]
        console.log(images_attributes)
        return images_attributes
    } return []
}

export function manageImageForNewDraftOrPost(imageData) {
    // returns a promise; promise is resolved in Post Editor
    return uploadImage(imageData)
}

export function manageImageForDraftOrPost(currentPostOrUser, imageState, isProfileImage = false) {
    // This function may return a promise; promise is resolved in Post Editor
    // debugger
    console.log("Image manager called")
    let images = currentPostOrUser.images
    let imageData = imageState
    // If the post or user has an image on record, and there no image included in post editor or user profile, delete the post's or user's record image
    if (images[0] !== undefined && imageData === undefined) {
        return deleteImage(images[0])
    // If the post or user has an image on record, and there is an image included in post editor or user profile, if there is a difference in file name or size, replace the post's or user's record image; otherwise, leave the current record's image
    } else if (images[0] !== undefined && imageData !== undefined) {
        if ( images[0].name !== imageData.name || images[0].size !== imageData.size ) {
            return updateImage(images[0], imageData)
        } return [images[0]]
    // If the post or user has no image on record and there is an image included in post editor or user profile, upload the image to Amazon S3
    } else if (images[0] === undefined && imageData !== undefined) {
        return uploadImage(imageData, isProfileImage)
    } return []
}


// THE BELOW FUNCTION IS NOT NEEEDED AS USERS ARE RETRIEVED ALONG WITH THEIR PROFILE IMAGE FROM THE BACKEND API
// export function fetchProfileImages(endpoint) {
//     return async (dispatch) => {
//         await axios.get(endpoint)
//         .then( response => {
//             console.log(response.data)
//             dispatch({type: 'ADD_IMAGES', payload: response.data })
//         })
//         .catch(error => {
//             auth.logout()
//             console.log(error.response)
//         })
//     }
// }


