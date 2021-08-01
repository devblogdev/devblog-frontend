import axios from 'axios'
import auth from '../components/security/auth'

export function fetchPosts(endpoint) {
    return (dispatch) => {
        axios.get(endpoint)
        .then(response => {
            console.log(response)
            dispatch({type: 'FETCH_POSTS', payload: response.data })
        })
        .catch(error => {
            console.log(error)
            auth.logout()
        })
    }
}