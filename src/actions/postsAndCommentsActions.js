import axios from 'axios'
import auth from '../components/security/auth'

export function fetchPosts(endpoint) {
    return async (dispatch) => {
        dispatch({type: 'LOADING_POSTS', payload: "Loading posts..." })
        const response = await axios.get(endpoint)
            .catch(error => {
                console.log(error)
                auth.logout()
            })
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
                if (response.data.status === "published" ){
                    routerProps.history.push(`/posts/${response.data.id}`)
                } else {
                    routerProps.history.push("/profile")
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

export function editPost(endpoint, postData, routerProps=null, modalFunction){
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
                dispatch( {type: 'EDIT_POST', payload: response.data})
                dispatch( {type: "EDIT_USER_POST", payload: response.data})
                if (response.data.status === "published") {
                    routerProps.history.push(`/posts/${response.data.id}`)
                } 
                modalFunction(["Draft successfully saved"])
              })
              .catch(error => {
                console.log(error);
              });
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}

export function deletePost(endpoint, postData, routerProps=null){
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
                    dispatch( {type: 'DELETE_POST', payload: postData.id})
                } else {
                    dispatch( {type: 'DELETE_USER_POST', payload: postData.id})
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


