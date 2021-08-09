import React from 'react'
import PostCard from './PostCard'
import { Link } from 'react-router-dom'

 const PostList = ({match, posts}) => {
     console.log(match)
    const postCards = posts.map((post, index) => {
      if (post.coming_from === "database") {
       return  <Link key={index} to={`/posts/${post.id}`}>
                 <PostCard post = {post} /> 
               </Link>
      } return <a key={-index} href={post.url} target="_blank" rel="noreferrer noopener"><PostCard post = {post} /></a>
    })
    console.log(posts)
    return (
        <div>
            <h1>Post List</h1>     
            {postCards}
        </div>
    )
}

export default PostList