import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';


const  Post = ({match, posts, user}) => {
    const storePosts = useSelector( state => state.posts.posts)
    const [currentPost, setCurrentPost] = useState({})
    // const loadedPost = storePosts?.find(({id}) => id == match.params.postID)
    const loadedPost = posts?.find(({id}) => id == match.params.postID)
    const editButton = <Link to={`/posts/edit/${currentPost.id}`}>Edit post</Link>
    console.log(user)

    useEffect(() => {
        setCurrentPost(loadedPost)
    }, [storePosts]);

    console.log(currentPost)
    return(
        <div>
            {editButton}
            <h1>Title: {currentPost.title}</h1>
            <h1>Body: {currentPost.body}</h1>
        </div>
    )
}

export default Post