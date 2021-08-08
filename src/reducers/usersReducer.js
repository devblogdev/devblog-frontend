import auth from "../components/security/auth";

export default function usersReducer(
    state = {
        users: [],
        current_user: {}
    }, action) {

        
        let post 
        let postId
        let postIndex
        

    switch(action.type) {

        case 'SET_USER':
            auth.login();
            return {...state, current_user: action.payload }

        case 'LOGOUT_USER':
            auth.logout();
            return {...state, current_user: {}}

        case 'ADD_POST_TO_USER':
            console.log("Users reducer called")
            post = action.payload
            return {
                ...state, 
                    current_user: {
                        ...state.current_user, 
                            posts: [...state.current_user.posts, post]
                    }
            }

        case 'EDIT_USER_POST':
            console.log("Users edit post reducer called")
            postId = action.payload.id
            postIndex = state.current_user.posts.findIndex( post => post.id == postId)
            post = action.payload
            return {
                ...state, 
                    current_user: {
                        ...state.current_user,
                            posts: [...state.current_user.posts.slice(0, postIndex), post, ...state.current_user.posts.slice(postIndex+1)]
                    }
            }
  
        default:
            return state
    }
} 
