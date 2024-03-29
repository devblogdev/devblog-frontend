import axios from 'axios'
import auth from '..//components/security/auth'

export function createOrLoginUser(endpoint, userData, routerAndModal) {
    return (dispatch) => {
        // debugger
        axios.post(endpoint, {user: userData})
        .then(response => {
            // If the user is signing up via email, redirect to registration-confirmation page
            if(endpoint === "/users"){
                dispatch({type: "SET_CONFIRMATION_EMAIL", payload: response.data.email })
                routerAndModal.history.push('/registration-confirmation')
            }
            else {
                localStorage.setItem('token', response.data.jwt)
                const payload = {
                    user: typeof(response.data.user) === "object" ? response.data.user : JSON.parse(response.data.user),
                    sessionToken: {
                        token: response.data.jwt,
                        exp: response.data.exp
                    }
                }
                dispatch({type: 'SET_USER', payload: payload })
                routerAndModal.history.push('/')
                routerAndModal.retrieveModalState(["You have been successfully logged in"])
            }
        })
        .catch(error => {
            auth.logout()
            console.log(error)
            console.log(error.response)
            routerAndModal.retrieveModalState(error.response?.data.errors, 5000)
        })
    }
}

// export function fetchUsers(endpoint) {
//     return async (dispatch) => {
//         const response = await axios.get(endpoint)
//         .catch(error => {
//             auth.logout()
//             console.log(error.response)
//         })
//         dispatch({type: 'ADD_USERS', payload: response.data })
//     }
// }
export function fetchUsers(endpoint) {
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint)
            dispatch({type: 'ADD_USERS', payload: response.data })
        } catch(error) {
            auth.logout()
            console.log(error.response)
        }       
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

