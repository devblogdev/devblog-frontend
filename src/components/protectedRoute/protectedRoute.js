import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user: current_user, posts: published, retrieveModalState: RetrieveModalState, loading: Loading, ...rest}) => {
    console.log(rest)
    return (
        <Route {...rest}
            render = {props => {
                const token = localStorage.getItem('token')
                if (token) {
                    return <Component {...props} user={current_user} posts={published} retrieveModalState={RetrieveModalState} loading={Loading} token />
                }return <Redirect to={{pathname: '/'}} />
            }}
        />
    )
}

export default ProtectedRoute