import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user: current_user, posts: published, retrieveModalState: RetrieveModalState, loading: Loading, ...rest}) => {
    console.log(rest)
    return (
        <Route {...rest}
            render = {props => {
                const token = localStorage.getItem('token')
                console.log(props)
                if (token) {
                    return <Component {...props} user={current_user} posts={published} retrieveModalState={RetrieveModalState} loading={Loading} token />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }  
            }}
        />
    )
}

export default ProtectedRoute