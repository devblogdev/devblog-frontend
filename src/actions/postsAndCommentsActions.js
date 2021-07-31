
export function fetchNYTIMESposts(endpoint) {
    return (dispatch) => {
        axios.get(endpoint)
        .then(response => {
            console.log(response)
            // dispatch({type: 'SET_USER', payload: response.data.user })
            // routerProps.history.push('/')
        })
        .catch(error => {
            auth.logout()
            console.log(error)
        })
    }
}