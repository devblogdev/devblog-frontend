// This reducer manages the posts' body images that are stored in the Imgur bucket

export default function imagesReducer(
    state = {
        // Keep an eye on these variables as some browsers may not support JavaScript Sets
        currentDraftOrPostBodyImages: { 
            oldImages: new Set(), 
            newImages: new Set()
        },
        finalStateDraftOrPostBodyImages: new Set(),
        imgurAlbums: {
            // It was necessary to pre-load the variables via environment variables
            // (as opposed to getting them from the backend or making an API call to the Imgur API) due to
            // the "uploadCallback" function in the Editor component from react-draft-wysiwyg
            // in the PostEditor component not registering the values from the 
            // below keys after an asynchronous API call to obtain the albums ids and update the state
            // using a dispatcher; esentially, it appears that the code passed to "uploadCallback"
            // gets frozen on first compenent render, and subsequent compoenent rerenders does
            // not make updated values for below keys to be reflected when "uploadCallback" is called
            'cover-images': process.env.REACT_APP_IMGUR_COVER_IMAGES_ALBUM,
            'body-images': process.env.REACT_APP_IMGUR_BODY_IMAGES_ALBUM,
            'profile-images': process.env.REACT_APP_IMGUR_PROFILE_IMAGES_ALBUM
        }
    }, action) {
        if(action.type === "REGISTER_IMAGES") {            
            return {
                ...state,
                    currentDraftOrPostBodyImages: {
                        ...state.currentDraftOrPostBodyImages,
                            oldImages: action.payload,
                            newImages: new Set()
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
        } else if(action.type === 'REGISTER_IMGUR_ALBUMS') {
            return {
                ...state,
                imgurAlbums: action.payload
            }
        }
        return state
}