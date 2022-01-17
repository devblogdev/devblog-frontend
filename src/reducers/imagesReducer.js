export default function imagesReducer(
    state = {
        currentDraftOrPostBodyImages: new Set(),
        finalStateDraftOrPostBodyImages: new Set(),
    }, action) {
        if(action.type === "REGISTER_IMAGES") {
            return {
                ...state,
                currentDraftOrPostBodyImages: action.payload
            }
        }
        else if(action.type === "REGISTER_NEW_MAGE") {
            return {
                ...state,
                currentDraftOrPostBodyImages: state.currentDraftOrPostBodyImages.add(action.payload)
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
                currentDraftOrPostBodyImages: new Set(),
                finalStateDraftOrPostBodyImages: new Set()
            }
        }
        return state
}