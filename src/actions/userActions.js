import axios from 'axios'
import auth from '..//components/security/auth'

export function CreateOrLoginUser(endpoint, userData, routerProps) {
    return (dispatch) => {
        axios.post(endpoint, {user: userData})
        .then(response => {
            localStorage.setItem('token', response.data.jwt)
            dispatch({type: 'SET_USER', payload: response.data.user })
            routerProps.history.push('/')
        })
        .catch(error => {
            auth.logout()
            console.log(error)
        })
    }
}

// const authorization= () => {
//     const token ="a"
//     if (token) {
//         return "Send API call to check user's credentials"
//     }
//     return auth.logout()


// }