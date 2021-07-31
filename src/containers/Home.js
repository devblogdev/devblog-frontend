import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import auth from '../components/security/auth'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import PostList from '../components/posts/PostList'

// MATERIAL UI DEPENDENCIES
import { makeStyles } from '@material-ui/core/styles';

// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

// MAIN COMPONENT; FUNCTIONAL COMPONENT
const Home = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
            // console.log("useEffect called in Home")
        }
    })
    // console.log("Home was called")
    const handleClick = event => {
        console.log("HELLO")
        axios.get("posts")
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
    return (
        <div>
        <React.Fragment>
            <h1>Welcome to DevBlog</h1>
                <Button 
                    onClick = {handleClick}
                >Get Posts
                </Button>
            {/* <PostList posts = {props.posts} {...props}/> */}
        </React.Fragment>
        </div>
    )
}

export default Home