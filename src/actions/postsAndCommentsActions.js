
export function fetchNYTIMESposts(endpoint) {
    return (dispatch) => {
        axios.get(endpoint)
        .then(response => {
            console.log(response)
            dispatch({type: 'FETCH_POSTS', payload: response.data })
        })
        .catch(error => {
            auth.logout()
            console.log(error)
        })
    }
}