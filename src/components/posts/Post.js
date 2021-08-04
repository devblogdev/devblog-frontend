import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

const  Post = ({match, posts}) => {
    const storePosts = useSelector( state => state.posts.posts)
    const [currentPost, setCurrentPost] = useState({})
    const loadedPost = storePosts?.find(({id}) => id == match.params.postID)
    useEffect(() => {
        setCurrentPost(loadedPost)
    }, [currentPost]);
    console.log(currentPost)
    return(
        <div>
            <h1>Title: {currentPost.title}</h1>
            <h1>Body: {currentPost.body}</h1>
        </div>
    )
}

export default Post