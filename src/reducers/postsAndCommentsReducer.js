
export default function postsAndCommentsReducer(
    state = {
        posts: [],
        comments: [],
        loading: false,
        message: ""
    }, action) {
        
        let userId 
        let post 
        let postId
        let postIndex
        let likeIndex
        
        switch(action.type) {
            case 'LAODING_POSTS':
                return {
                    ...state,
                    loading: true,
                    message: "Loading posts..."
                }

            case 'FETCH_POSTS':
                return {
                    ...state,
                    posts: action.posts,
                    loading: false,
                    message: ""
                }

            case 'ADD_POST':
                post = action.post
                return { ...state, ...state.posts, post}

            case 'REMOVE_POST':
                // postId = action.postId
                postIndex = state.posts.findIndex( post => post.id === postId)
                return {
                    ...state, 
                        posts: [
                            state.posts.slice(0, postIndex), state.posts.slice(postIndex+1)
                        ]
                }

            case 'ADD_LIKE':
                userId = "some user"
                postId= "someId"
                post = state.posts.find(post => post.id === postId)
                postIndex = state.posts.findIndex( post => post.id === postId )
                const newLike = {userId}
                post = [...post, ...post.likes, newLike]
                return {
                    ...state,
                        posts: [
                            state.posts.slice(0, postIndex), post, state.posts(postIndex+1)
                        ]
                }

            case 'REMOVE_LIKE':
                postId= "someId"
                // const retrieveIdandIndex = (object) => state.posts.find( (post, index) => {post.id === postId})
                userId = "some user"
                postIndex = state.posts.findIndex( post => post.id === postId )
                post = "hi"
                likeIndex = post.likes.findIndex(like => like.userId === userId)
                const postLikes = [ post.likes.slice(0, likeIndex), post.likes.slice(likeIndex+1) ] 
                post.likes = postLikes
                return {
                    ...state, 
                        posts: [
                            state.posts.slice(0, postIndex), post, state.posts(postIndex+1)
                        ]
                }
            default:
                return state
        }

}