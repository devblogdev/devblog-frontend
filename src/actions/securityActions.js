import axios from 'axios'
import auth from "../components/security/auth"

// Authentication function is not used in the App
export function authentication() {
    const token = localStorage.getItem('token')
    return (dispatch) => {
        if (token) {
            return auth.login()
        } else if (token === undefined) {
             return auth.logout()
        }
    }
}

// NOT USED
// export function authorization(endpoint=null, routerAndModal=null ) {
//     const token = localStorage.getItem('token')
//     let url
//     endpoint ? url= endpoint : url= '/profile' 
//     if(token){
//         return async (dispatch) => {
//             await axios.get(`${url}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     "Authorization": `Bearer ${token}`   
//                 }
//             })
//              .then(response => {
//                 console.log(response)
//                 dispatch({type:'SET_USER', payload: response.data})  
//              })
//              .catch(error => {
//                 dispatch({type: 'LOGOUT_USER'})
//                 console.log(error)
//              })
//         }
//     } return (dispatch) => {
//         dispatch({type: 'LOGOUT_USER'})
//     }
// }


// export function authorization(endpoint=null, routerAndModal=null ) {
//     const token = localStorage.getItem('token')
//     let url
//     endpoint ? url= endpoint : url= '/profile' 
//     const axiosConfig = {
//         headers: {
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`   
//         }
//     }
//     if(token){
//         return async (dispatch) => {
//             const response = await axios.get(`${url}`, axiosConfig)
//             .catch(error => {
//                 dispatch({type: 'LOGOUT_USER'})
//                 console.log(error)
//              })
//             console.log(response)
//             dispatch({type:'SET_USER', payload: response.data})  
//         }
//     } return (dispatch) => {
//         dispatch({type: 'LOGOUT_USER'})
//     }
// }

// NEW CODE
export function authorization(endpoint=null, routerAndModal=null ) {
    const token = localStorage.getItem('token')    
    // let url
    // endpoint ? url= endpoint : url= '/profile' 
    const url = endpoint || '/profile' 
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`   
        }
    }
    if(token){
        return async (dispatch) => {
            try {
                const response = await axios.get(`${url}`, axiosConfig)
                const payload = {
                    user: response.data
                }
                // dispatch({type:'SET_USER', payload: response.data})  
                dispatch({ type:'SET_USER', payload: payload })  
            } catch(error) {
                console.log(error)
                routerAndModal?.history?.push("/")
                if(routerAndModal?.retrieveModalState){
                    if(error.response.status === 401){
                        routerAndModal.retrieveModalState(["Your session has expired"])
                    }
                }
                dispatch({type: 'LOGOUT_USER'})
            }     
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}