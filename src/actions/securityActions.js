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

export function authorization(endpoint=null, routerProps=null ) {
    const token = localStorage.getItem('token')
    let url
    endpoint ? url= endpoint : url= '/profile' 
    if(token){
        return async (dispatch) => {
            await axios.get(`${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`   
                }
            })
             .then(response => {
                console.log(response)
                dispatch({type:'SET_USER', payload: response.data})  
             })
             .catch(error => {
                dispatch({type: 'LOGOUT_USER'})
                console.log(error)
             })
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}