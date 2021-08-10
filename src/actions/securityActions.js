import axios from 'axios'
import auth from "../components/security/auth"




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
            const response = await axios.get(`${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`   
                }
            })
             .catch(error => {
                dispatch({type: 'LOGOUT_USER'})
                console.log(error)
             })
            console.log(response)
            dispatch({type:'SET_USER', payload: response.data})   
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}