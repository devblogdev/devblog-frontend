import auth from "../components/security/auth";
import {arrayMoveImmutable} from '../components/utilities/arrayMove'

export default function usersReducer(
    state = {
        // 'users' is an array of public users: these are users that have published posts in the website; keys of an object in this array: id, bio (a hash), first_name, last_name, images
        // info for a user object in 'users' is visible to all page visitors
        users: [],
        // 'current_user'is the logged in user; this user is private and contains three additional keys compared to 'users': email, private (a hash), posts (an array of drafts and published posts)
        current_user: {}
    }, action) {

        let post 
        let postId
        let postIndex
        let user
        let userId
        let userIndex
        
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

        case "UPDATE_USER_PUBLIC":
            user = action.payload
            userId = user.id
            userIndex = state.users.findIndex( publicUser => publicUser.id === userId)
            if ( userIndex > -1 ) {
                return {
                    ...state,
                        users: [ ...state.users.slice(0, userIndex), user, ...state.users.slice( userIndex + 1 )]
                }
            } 
            return state

        
        // 'MOVE_AUTHOR_TO_TOP' handles two cases: 1) if the user already has published posts and publushes a new post, move the user to the top of the authors list
                                                // 2) if the user does not have published posts and publishes a post, add the user to the users array (the authors list), and place it on first place
        // In short: Wheneve a user publishes a post, move the user to the top of the authors list
        case "MOVE_AUTHOR_TO_TOP":
            post = action.payload.current
            let previous_status = action.payload.previous_status
              // condition one (P && Q): the user EDITED a previously saved draft and decided to publish it (contition runs on "editPost" function in PostandCommentsActions.js )
              // contition two ( || Q): the user created a NEW draft and published it immediately (contiion runs on "addPost" function in PostandCommentsActions.js )
            // Overall idea: if the user creates a NEW post and publishes it immediately or publishes a previosly saved draft, move the user to the to of the authors list
            if ( (previous_status === "draft" && post.status === "published") || post.status === "published") {
                let authorIndex = state.users.findIndex( user => user.id === post.user_id )
                // if a user publishes a post and the user already has published post(s), move the user to the top of the authors list
                if (authorIndex >- 1 ) {
                    return {
                        ...state, 
                            users: arrayMoveImmutable(state.users, authorIndex, 0 )
                    }
                // 'else' maeans the user does not currently have published posts and is publishing a post now; add the user to the top of the authors list
                } else {
                    // Grad the keys from the user that are included in the public bucket (id, first_name, last_name, bio, images); (shallow is not immutable)
                    let shallow_use_copyr = Object.assign({}, {id: state.current_user.id, first_name: state.current_user.first_name}, {last_name: state.current_user.last_name}, {bio: state.current_user.bio}, {images: state.current_user.images})
                    // Mkake a full independent copy of 'shallow_user_copy' (deep_shallow_copy is immutable)
                    let deep_user_copy = JSON.parse(JSON.stringify(shallow_use_copyr))
                    return {
                        ...state, 
                            users: [ deep_user_copy, ...state.users]
                    }
                }
            } return state


        default:
            return state
    }
} 
