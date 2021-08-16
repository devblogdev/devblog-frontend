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

