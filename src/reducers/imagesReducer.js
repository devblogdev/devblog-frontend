export default function imagesReducer(
    state = {
        markedForDestruction: []
    }, action) {
        if (action.type === 'ADD_IMAGE_FOR_DESTRUCTION') {
            return {
                ...state,
                markedForDestruction: [...state.markedForDestruction, action.payload]
            }
        } return state
}