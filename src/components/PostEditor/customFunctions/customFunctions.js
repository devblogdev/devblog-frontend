// import axios from "axios";
import { difference } from "../../utilities/setsFunctions";

// helper function
const extractBodyImages = (data)=> {
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
        const images = extractBodyImages(data);
        if(images.size) {
            if(state.type === "initial") {
                dispatch({ type: "REGISTER_IMAGES", payload: images} )
                console.log(`${images.length} images registered in initla state`) 
            } 
            else if(state.type === "final") {
                dispatch({ type: "REGISTER_FINAL_STATE_IMAGES", payload: images} )
                console.log(`${images.length} images registered in final state`) 
            }
            
        } else  {
            console.log("No images registered")
        }
    }
}


export function scheduleImagesForDestruction(initialStateImages, finalStateImages) {
    const initial = initialStateImages;
    const final = finalStateImages;
    console.log(initial);
    console.log(final);
    return new Promise((resolve, reject) => {
        // if there are registered images
        if (initial.size) {
            setTimeout( () => {
                const markedForDestruction = difference(initial, final);
                console.log(markedForDestruction)
                if (markedForDestruction.size) {                    // convert the set into an array
                    // axios.post("/images/schedule-for-destruction", {urls: [...markedForDestruction]})
                    //     .then(resp => resolve(console.log(resp)))
                    //     .catch(error => reject(console.log(error)))
                } 
                else {
                    resolve(console.log("No scheduled images for destruciton"))
                }
    
            }, 1000)

        }
        else resolve(console.log("No scheduled images for destruciton"))
        
    })
}

