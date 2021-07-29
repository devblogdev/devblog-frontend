
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
            case 'FETCH_POSTS':
                return {
                    ...state,
                    posts: action.posts,
                    loading: false,
                    message: ""
                }
            
            case 'ADD_LIKE':
                const user = "some user"
                const postId= "someId"
                const post= state.posts.find(post => post.id === postId)
                const postIndex = state.posts.findIndex( post => post.id === postId )
                const newLike = {userId: user}
                post = [...post, ...post.likes, newLike]
                return {
                    ...state,
                        posts: [
                            state.posts.slice(0, postIndex), post, state.posts(postIndex+1)
                        ]
                }
            case 'REMOVE_LIKE':
                const postID= "someId"
                // const retrieveIdandIndex = (object) => state.posts.find( (post, index) => {post.id === postId})
                const user = "some user"
                const postIndex = state.posts.findIndex( post => post.id === postId )
                const post = "hi"
                const likeIndex = post.likes.findIndex(like => like.userId === user)
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