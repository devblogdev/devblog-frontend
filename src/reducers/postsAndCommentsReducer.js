
export default function postsAndCommentsReducer(
    state = {
        posts: [],
        comments: [],
        loading: false,
        message: ""
    }, action) {
        switch(action.type) {
            case 'LAODING_POSTS':
                return {
                    ...state,
                    loading: true,
                    message: "Loading posts..."
                }
            case 'FETCH_STUDIES':
                return {
                    ...state,
                    studies: action.studies,
                    loading: false,
                    message: ""
                }
            default:
                return state
        }

}