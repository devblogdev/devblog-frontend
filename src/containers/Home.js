import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PostList from '../components/posts/PostList';

// MAIN COMPONENT; FUNCTIONAL COMPONENT
const Home = (props) => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
        }
    })

    return (
        <React.Fragment>
            <h1>Welcome to DevBlog</h1>
            <PostList posts ={props.posts} {...props} />
        </React.Fragment>
    )
}

export default Home