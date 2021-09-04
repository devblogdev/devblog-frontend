export default function imagesReducer(
    state = {
        profileImages: []
    }, action) {
        
        if (action.type === 'ADD_IMAGES') {
            return {
                ...state,
                profileImages: action.payload
            }
        } return state
}