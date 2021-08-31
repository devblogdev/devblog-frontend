import React from 'react'
import Post from '../components/posts/Post'

export default function PostsAndCommentsContainer(props) {
    return (
        <div className="postPage standardSize">
             <Post {...props} posts = {props.posts} users={props.users} />
        </div>
    )
}

