// import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../security/auth'

const ProtectedRoute = ({ component: Component, user: current_user, ...rest}) => {
    return (
        <Route {...rest}
            render = {props => {
                const token = localStorage.getItem('token')
                console.log(auth.isAuthenticated())
                if (token) {
                    return <Component {...props} user={current_user} token />
                } return <Redirect to={{pathname: '/'}} />
            }}
        />
    )
}

export default ProtectedRoute