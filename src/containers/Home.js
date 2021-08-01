import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

// import auth from '../components/security/auth'
import PostList from '../components/posts/PostList'
import { fetchPosts } from '../actions/postsAndCommentsActions'
import Post from '../components/posts/Post'

// MATERIAL UI DEPENDENCIES
// import Button from '@material-ui/core/Button';
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
    const posts = useSelector((state) => state.posts.posts)
    
    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
        }
    })

    useEffect(() => {
        const endpoint = "/posts"
        dispatch(fetchPosts(endpoint))
    }, [dispatch])
    
    return (
        <div>
        <React.Fragment>
            <h1>Welcome to DevBlog</h1>
            <Route path={`/posts/:postID`} render= {props => <Post {...props} posts = {posts} />} />
            <PostList posts ={posts} />
        </React.Fragment>
        </div>
    )
}

export default Home