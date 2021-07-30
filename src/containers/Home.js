import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const  Home = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
        }
    })

    return (
        <div>
            <h1>Weocome to DevBlog</h1>
        </div>
    )
}

export default Home