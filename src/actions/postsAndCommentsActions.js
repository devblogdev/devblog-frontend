import axios from 'axios'
import auth from '../components/security/auth'

export function fetchPosts(endpoint) {
    return async (dispatch) => {
        dispatch({type: 'LOADING_POSTS', payload: "Loading posts..." })
        try {
            const response = await axios.get(endpoint)
            dispatch({type: 'FETCH_POSTS', payload: response.data })
        } catch(error) {
            console.log(error)
            auth.logout()
        }        
    }
}

// 'addPost' handles two cases: 1) user creates a new post and saves it as a draft; 2) user creates a new post and publishes it immediately
export function addPost(endpoint, postData, routerAndModal=null){
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return async (dispatch) => {
           await axios.post(`${endpoint}`, {post: postData} , axiosConfig)
            .then( response => {
                console.log(response)
                // whenever a user publishes a NEW post, move the user to the top of authors list
                // WARNING: **(comments below)
                dispatch( {type: "MOVE_AUTHOR_TO_TOP", payload: {previous_status: undefined, current: response.data} })
                dispatch( {type: 'ADD_POST', payload: response.data})
                dispatch( {type: "ADD_POST_TO_USER", payload: response.data})
                // WARNING: **(comments below)
                if (response.data.status === "published" ){
                    routerAndModal.history.push(`/posts/${response.data.id}`)
                    routerAndModal.retrieveModalState(["Post successfully published"])
                } else {
                    routerAndModal.history.push("/profile")
                    routerAndModal.retrieveModalState(["Draft successfully created"])
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}
// ** Warning: Order matters: 'MOVE_AUTHOR_TO_TOP' will add the current user to the authors list if the user does not already have published posts at the time of publishing;
// this action will update the 'users' array in 'usersReducer.js'; then 'ADD_POST' will update the 'posts' array in 'PostsAndCommentsReducer.js'; this later update
// triggers the 'authorPost' function in Author.js, which finds all the ppsts for the clicked author name;
// if the order is reversed, the 'posts' array will be updated first and the 'authorPost' function will run
// and, since at this time the author has not yet been added to the 'users' array, the author will be 'undefined' in 'authorPost' function
// the result will be that when the user clicks on his/her name in the Authors list, the just published post will not be shown, which will cause confusion for the user
// Reversing the orginial order does not break the code, a page refresh will update everything to the correct state



// 'editPost' handles three cases: 1) user edits an existiing draft and saves it as a draft; 2) user edits an existing draft and publishes the draft
                             //    3) user updates an existing post
export function editPost(endpoint, postData, routerAndModal=null, bodyImages){
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return async(dispatch) => {
            await axios.put(`${endpoint}`, {post: postData} , axiosConfig)
              .then( response => {
                console.log(response)
                // dispatch( {type: "UNREGISTER_IMAGES"})
                // WARNING: **
                dispatch( {type: "MOVE_AUTHOR_TO_TOP", payload: {previous_status: postData.status, current: response.data} })
                dispatch( {type: 'EDIT_POST', payload: response.data})
                dispatch( {type: "EDIT_USER_POST", payload: response.data})
                // WARNING: **
                if (response.data.status === "published") {
                    routerAndModal.history.push(`/posts/${response.data.id}`)
                    routerAndModal.retrieveModalState(["Post successfully published"])
                } else {
                    routerAndModal.history.push('/profile')
                    routerAndModal.retrieveModalState(["Draft successfully saved"])
                }
                // IMPORTANT: The 'scheduleImagesForDestruction' needs to be run last as if it is placed above and an error occurs (it makes an API call), 
                // the remainder code will stop executing, leaving the user inside the post editor when clikcing on 'Save', 'Publish' or other buttons
                const { scheduleImagesForDestruction, initialAll, final } = bodyImages;
                scheduleImagesForDestruction(initialAll, final);
              })
              .catch(error => {
                console.log(error);
              });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}
// WARMING: ** See note included below 'addPost'

export function deletePost(endpoint, postData, routerAndModal=null){
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return async (dispatch) => {
            await axios.delete(`${endpoint}`, axiosConfig)
              .then( response => {
                console.log(response)
                if (postData.status === "published") {
                    routerAndModal.history.push("/profile")
                    dispatch( {type: 'DELETE_POST', payload: postData.id})
                    routerAndModal.retrieveModalState(["Post successfully deleted"])
                } else if ( postData.status === "draft") {
                    routerAndModal.history.push("/profile")
                    dispatch( {type: 'DELETE_USER_POST', payload: postData.id})
                    routerAndModal.retrieveModalState(["Draft successfully deleted"])
                }
              })
              .catch(error => {
                console.log(error);
              });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}


