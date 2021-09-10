import axios from 'axios'
import auth from '..//components/security/auth'

export function createOrLoginUser(endpoint, userData, routerAndModal) {
    return (dispatch) => {
        // debugger
        axios.post(endpoint, {user: userData})
        .then(response => {
            localStorage.setItem('token', response.data.jwt)
            console.log(response)
            dispatch({type: 'SET_USER', payload: response.data.user })
            routerAndModal.history.push('/')
        })
        .catch(error => {
            // debugger
            auth.logout()
            console.log(error.response)
            routerAndModal.retrieveModalState(error.response.data.errors, 5000)
        })
    }
}

export function fetchUsers(endpoint) {
    return async (dispatch) => {
        const response = await axios.get(endpoint)
        .catch(error => {
            auth.logout()
            console.log(error.response)
        })
        dispatch({type: 'ADD_USERS', payload: response.data })
    }
}


export function updateUser(endpoint, userData, routerAndModal=null){
    const token = localStorage.getItem('token')
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return async(dispatch) => {
            await axios.put(`${endpoint}`, {user: userData} , axiosConfig)
              .then( response => {
                console.log(response)
                dispatch( {type: "UPDATE_USER_PRIVATE", payload: response.data})
                dispatch( {type: 'UPDATE_USER_PUBLIC', payload: response.data})
                routerAndModal.retrieveModalState(["Profile successfully updated"])
              })
              .catch(error => {
                console.log(error);
              });
        }
    } return (dispatch) => {
        // dispatch({type: 'LOGOUT_USER'})
    }
}

