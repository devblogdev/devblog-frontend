import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import auth from '../components/security/auth'

const  Home = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
            // console.log("useEffect called in Home")
        }
    })
    console.log("Home was called")

    return (
        <div>
            <h1>Welcome to DevBlog</h1>
        </div>
    )
}

export default Home