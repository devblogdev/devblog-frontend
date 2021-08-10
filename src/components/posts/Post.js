import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button';

const  Post = ({match, posts, user}) => {
    // const storePosts = useSelector( state => state.posts.posts)
    // const [currentPost, setCurrentPost] = useState({})
    // const [loadedPosts, setLoadedPosts] = useState([])
    const [post, setPost] = useState({})
    const [editButton, setEditButton] = useState()
    // const allPosts = useSelector((state) => state.posts.posts)
    // const loadedPost = posts?.find(({id}) => id == match.params.postID)
    // const post = loadedPosts.find(({id}) => id == match.params.postID)
    // const editButton = <Link to={`/posts/edit/${loadedPost.id}`}>Edit post</Link>
    // console.log(posts)

    useEffect(() => { 
        if (posts.length > 0) {
            setPost( () => posts.find(({id}) => `${id}` === match.params.postID)
            )
        }
    },[posts, match.params.postID]);

    console.log(post)
    useEffect(() => { 
        setEditButton(() => <Link to={`/posts/edit/${post.id}`}>Edit post</Link> )
    },[post]);

    return(
        <div>
            {editButton}
            <h1>Title: {post.title}</h1>
            <h1>Body: {post.body}</h1>
        </div>
    )
}
export default Post




