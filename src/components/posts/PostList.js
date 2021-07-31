import React from 'react'
import PostCard from './PostCard'
import {Route, Link} from 'react-router-dom'

 const PostList = ({ match, posts: posts}) => {
    //  debugger
    const allPosts = posts.map((post,index) => {
       <Link key={index} to={`/posts/${index}`}>
           <li key={index}>
               <PostCard post= {post} /> 
           </li>
        </Link>
    })

    return (
        <div>
            {allPosts}
            <Route path={`${match.url}/:postId`} render= {routerProps => <PostCard {...routerProps} posts = {allPosts} />} />
        </div>
    )
}

export default PostList