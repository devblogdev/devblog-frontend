import { Route, Redirect } from 'react-router-dom'
import { ActivationProvider } from '../users/ActivationContext'


const ProtectedRoute = ({ component: Component, user: current_user, posts: published, retrieveModalState: RetrieveModalState, ...rest}) => {
    console.log("Protected route called")
    return (
        <ActivationProvider>
            <Route {...rest}
                render = {props => {
                    const token = localStorage.getItem('token')
                    if (token) {
                        return <Component {...props} user={current_user} posts={published} retrieveModalState={RetrieveModalState} token />
                    }
                    else {
                        return <Redirect to={
                            {
                                pathname: '/',
                                state: {
                                    // from: props.location
                                    from: "/unauthorized"
                                }
                            }
                        } />
                    }  
                }}
            />
        </ActivationProvider>
    )
}

export default ProtectedRoute