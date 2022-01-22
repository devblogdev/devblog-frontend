// This reducer manages the posts' body images that are stored in the Imgur bucket

export default function imagesReducer(
    state = {
        // Keep an eye on these variables as some browsers may not support JavaScript Sets
        currentDraftOrPostBodyImages: { 
            oldImages: new Set(), 
            newImages: new Set()
        },
        finalStateDraftOrPostBodyImages: new Set()
    }, action) {
        if(action.type === "REGISTER_IMAGES") {            
            return {
                ...state,
                    currentDraftOrPostBodyImages: {
                        ...state.currentDraftOrPostBodyImages,
                            oldImages: action.payload
                }
            }
        }
        else if(action.type === "REGISTER_NEW_IMAGE") {
            return {
                ...state,
                    currentDraftOrPostBodyImages: {
                        ...state.currentDraftOrPostBodyImages,
                            newImages: state.currentDraftOrPostBodyImages.newImages.add(action.payload)
                }
            }
        }
        else if(action.type === "REGISTER_FINAL_STATE_IMAGES") {
            return {
                ...state,
                    finalStateDraftOrPostBodyImages: action.payload
            }
        }
        else if(action.type === "UNREGISTER_IMAGES") {
            return {
                ...state, 
                    currentDraftOrPostBodyImages: { 
                        oldImages: new Set(), 
                        newImages: new Set()
                    },
                    finalStateDraftOrPostBodyImages: new Set()
            }
        }
        return state
}