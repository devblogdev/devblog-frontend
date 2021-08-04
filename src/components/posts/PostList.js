import React from 'react'
import PostCard from './PostCard'
import { Link } from 'react-router-dom'

 const PostList = ({posts}) => {
    const i = -100
    const postCards = posts.map((post, index) => {
      if (post.coming_from === "database") {
       return  <Link key={index} to={`/posts/${post.id}`}>
                 <PostCard post = {post} /> 
               </Link>
      } return <a key={index + i} href={post.url} target="_blank" rel="noreferrer noopener"><PostCard post = {post} /></a>
    })
    return (
        <div>
            <h1>Post List</h1>     
            {postCards}
        </div>
    )
}

export default PostList