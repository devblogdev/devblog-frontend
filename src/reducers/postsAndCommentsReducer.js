
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
            case 'LOADING_POSTS':
                return {
                    ...state,
                    loading: true,
                    message: "Loading posts ..."
                }

            case 'FETCH_POSTS':
                // debugger
                return {
                    ...state,
                    loading: false,
                    message: "",
                    posts: action.payload
                }

            case 'ADD_POST':
                post = action.payload
                if (post.status === "published") {
                    console.log("ADD PONT ACTION REACHED")
                    return { ...state, posts: [...state.posts, post] }
                } return state

            case 'EDIT_POST':
                post = action.payload
                postId = action.payload.id
                postIndex = state.posts.findIndex( post => post.id === postId)
                 // If the post is in the public bucket (published), update the post [-1 meanns result not found]
                if (postIndex > -1) {
                    return {
                        ...state, 
                            posts: [
                                ...state.posts.slice(0, postIndex), post, ...state.posts.slice(postIndex+1)
                            ]                    
                    } 
                 // if hte post is not in the public bucket, include it in the bucket (that is, post changed status from "draft" to "published")
                } else if (postIndex === -1 && post.status === "published") {
                  return   { ...state, posts: [...state.posts, post] }
                } 
                return state
                                 
            case 'DELETE_POST':
                postId = action.payload
                postIndex = state.posts.findIndex( post => post.id === postId)
                if (postIndex > -1) {
                    return {...state, 
                        posts: [
                            ...state.posts.slice(0, postIndex), ...state.posts.slice(postIndex+1)
                        ]
                    }
                }
                return state
                
           
                // Add code to remove post's associated comments, WHEN COMMENTS ARE IMPLEMENTED
      
                // PLACE HOLDER CODE WHEN LIKES IS IMPLEMENTED
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
                            ...state.posts.slice(0, postIndex), post, ...state.posts(postIndex+1)
                        ]
                }

                // PLACE HOLDER CODE WHEN LIKES IS IMPLEMENTED
            case 'REMOVE_LIKE':
                postId= "someId"
                // const retrieveIdandIndex = (object) => state.posts.find( (post, index) => {post.id === postId})
                userId = "some user"
                postIndex = state.posts.findIndex( post => post.id === postId )
                post = "hi"
                likeIndex = post.likes.findIndex(like => like.userId === userId)
                const postLikes = [ ...post.likes.slice(0, likeIndex), ...post.likes.slice(likeIndex+1) ] 
                post.likes = postLikes
                return {
                    ...state, 
                        posts: [
                            ...state.posts.slice(0, postIndex), post, ...state.posts(postIndex+1)
                        ]
                }
            default:
                return state
        }

}