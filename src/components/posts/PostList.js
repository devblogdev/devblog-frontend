import React from 'react'
import PostCard from './PostCard'
import Post from './Post'
import {Route, Link } from 'react-router-dom'

 const PostList = ({ match, posts}) => {
    //  debugger
    console.log(match)
    const allPosts = posts.map((post,postID) => {
       return <Link key={postID} to={`/posts/${postID}`}>
                <PostCard post= {post} /> 
              </Link>
    })

    return (
        <div>
            <h1>Post List</h1>
            {allPosts}
            
            {/* <Route path={`/posts/:postID`} render= {routerProps => <Post {...routerProps} posts = {posts} />} /> */}
            <Route path={`/posts/:postID`}>HELLOS</Route>
            
        </div>
    )
}

export default PostList