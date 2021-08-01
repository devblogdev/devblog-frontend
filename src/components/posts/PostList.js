import React from 'react'
import PostCard from './PostCard'
import { Link } from 'react-router-dom'

 const PostList = ({posts}) => {
    const allPosts = posts.map((post,postID) => 
        <Link key={postID} to={`/posts/${postID}`}>
            <PostCard post = {post} /> 
        </Link>
    )
    return (
        <div>
            <h1>Post List</h1>     
            {allPosts}
        </div>
    )
}

export default PostList