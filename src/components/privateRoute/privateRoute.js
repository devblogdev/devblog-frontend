// import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user: current_user, ...rest}) => {
    return (
        <Route {...rest}
            render = {props => {
                const token = localStorage.getItem('token')
                if (token) {
                    return <Component {...props} user={current_user} />
                } return <Redirect to={{pathname: '/login'}} />
            }}
        />
    )
}

export default ProtectedRoute