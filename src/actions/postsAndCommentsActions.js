import axios from 'axios'
import auth from '../components/security/auth'

export function fetchPosts(endpoint) {
    return (dispatch) => {
       axios.get(endpoint)
        .then(response => {
            // console.log(response)
            dispatch({type: 'FETCH_POSTS', payload: response.data })
        })
        .catch(error => {
            console.log(error)
            auth.logout()
        })
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
        return (dispatch) => {
            axios.post(`${endpoint}`, {post: postData} , axiosConfig)
            .then( response => {
                console.log(response)
                dispatch( {type: 'ADD_POST', payload: response.data})
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
                console.log(response)
                dispatch( {type: 'EDIT_POST', payload: response.data})
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


