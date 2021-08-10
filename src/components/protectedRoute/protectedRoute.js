import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user: current_user, posts: published, ...rest}) => {
    console.log(rest)
    return (
        <Route {...rest}
            render = {props => {
                const token = localStorage.getItem('token')
                if (token) {
                    return <Component {...props} user={current_user} posts={published} token />
                }return <Redirect to={{pathname: '/'}} />
            }}
        />
    )
}

export default ProtectedRoute