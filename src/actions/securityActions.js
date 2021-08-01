import axios from 'axios'
import auth from "../components/security/auth"

export function authentication() {
    const token = localStorage.getItem('token')
    return () => {
        if (token) {
            // console.log("Logged in worked")
            return auth.login()
        } else if (token === undefined) {
            // console.log("Logged out worked")
             return auth.logout()
        }
    }
}

export function authorization(endpoint=null, routerProps=null ) {
    const token = localStorage.getItem('token')
    let url
    endpoint ? url= endpoint : url= '/profile' 
    console.log("Security called")
    if(token){
        return (dispatch) => {
            axios.get(`http://localhost:3000${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // console.log(response.data.user)
                dispatch({type:'SET_USER', payload: response.data.user})   
            })
            .catch(error => {
                dispatch({type: 'LOGOUT_USER'})
                console.log(error)
                // return routerProps ? routerProps.history.push('/') : null
            })
        }
    } return (dispatch) => {
        dispatch({type: 'LOGOUT_USER'})
    }
}