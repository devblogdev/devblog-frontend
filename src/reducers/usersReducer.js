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
        
        case 'ADD_USERS':
            console.log(action.payload)
            return { ...state, users: action.payload }

        case 'LOGOUT_USER':
            auth.logout();
            return {...state, current_user: {}}

        case 'ADD_POST_TO_USER':
            console.log("Users ADD POST reducer called")
            post = action.payload
            return {
                ...state, 
                    current_user: {
                        ...state.current_user, 
                            posts: [ post, ...state.current_user.posts ]
                    }
            }

        case 'EDIT_USER_POST':
            console.log("Users edit post reducer called")
            postId = action.payload.id
            postIndex = state.current_user.posts.findIndex( post => post.id === postId)
            post = action.payload
            return {
                ...state, 
                    current_user: {
                        ...state.current_user,
                            posts: [...state.current_user.posts.slice(0, postIndex), post, ...state.current_user.posts.slice(postIndex+1)]
                    }
            }

        case "DELETE_USER_POST":
            postId = action.payload
            postIndex = state.current_user.posts.findIndex( post => post.id === postId)
            if (postIndex > -1 ) {
                return {
                    ...state,
                        current_user: {
                            ...state.current_user,
                                posts: [...state.current_user.posts.slice(0, postIndex), ...state.current_user.posts.slice(postIndex + 1) ]
                        }
                }
            }
            return state
        
        case "UPDATE_USER_PRIVATE":
            return { ...state, current_user: action.payload }

        default:
            return state
    }
} 
