import axios from 'axios'
import auth from '../components/security/auth'

// export function fetchPosts(endpoint) {
//     return async (dispatch) => {
//         dispatch({type: 'LOADING_POSTS' })
//        await axios.get(endpoint)
//         .then(response => {
//             // console.log(response)
//             dispatch({type: 'FETCH_POSTS', payload: response.data })
//         })
//         .catch(error => {
//             console.log(error)
//             auth.logout()
//         })
//     }
// }
export function fetchPosts(endpoint) {
    return async (dispatch) => {
        dispatch({type: 'LOADING_POSTS' })
        const response = await axios.get(endpoint)
            .catch(error => {
                console.log(error)
                auth.logout()
            })
            // console.log(response)
            dispatch({type: 'FETCH_POSTS', payload: response.data })
    }
}


export function addPost(endpoint, postData, routerProps=null){
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
                dispatch( {type: 'ADD_POST', payload: response.data})
                dispatch( {type: "ADD_POST_TO_USER", payload: response.data})
                // debugger
                if (response.data.status === "published" ){
                    console.log(`/posts/${response.data.id}`)
                }
                routerProps?.history.push(`/posts/${response.data.id}`)
            })
            .catch(error => {
                console.log(error);
            });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
        // "Your session expired, please log back in"
    }
}


export function editPost(endpoint, postData, routerProps=null){
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return (dispatch) => {
            axios.put(`${endpoint}`, {post: postData} , axiosConfig)
            .then( response => {
                // debugger
                console.log(response)
                dispatch( {type: 'EDIT_POST', payload: response.data})
                dispatch( {type: "EDIT_USER_POST", payload: response.data})
                if (response.data.status === "published") {
                    
                    routerProps.history.push(`/posts/${response.data.id}`)
                } else {
                    
                    routerProps.history.push("/proflie")
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
        // "Your session expired, please log back in"
    }
}

export function deletePost(endpoint, postID, routerProps=null){
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return (dispatch) => {
            axios.delete(`${endpoint}`, axiosConfig)
            .then( response => {
                console.log(response)
                dispatch( {type: 'DELETE_POST', payload: postID})
            })
            .catch(error => {
                console.log(error);
            });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
        // "Your session expired, please log back in"
    }
}


