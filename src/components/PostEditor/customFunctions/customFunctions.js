import axios from "axios";
import { difference } from "../../utilities/setsFunctions";

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
        // if(images.size) {
        if(images.size) {
            if(state.type === "initial") {
                dispatch({ type: "REGISTER_IMAGES", payload: images } )
                dispatch({ type: "REGISTER_FINAL_STATE_IMAGES", payload: images } )
                console.log(images)
                console.log(`${images.size} images registered in initial and final states`) 
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
    // if there are registered images
    if (initial.size) {
        return new Promise((resolve, reject) => {            
            setTimeout( () => {
                const markedForDestruction = difference(initial, final);
                console.log(markedForDestruction)
                if (markedForDestruction) {                           // convert the set into an array
                    axios.post("/images/schedule-for-destion", {urls: [...markedForDestruction]})
                        .then(resp => resolve(console.log(resp)))
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

