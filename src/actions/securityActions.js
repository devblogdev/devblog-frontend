import axios from 'axios'

export function authorization(endpoint=null, routerAndModal=null ) {
    const token = localStorage.getItem('token')    
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