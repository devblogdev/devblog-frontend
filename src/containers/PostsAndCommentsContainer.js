import React from 'react'
import Post from '../components/posts/Post'

export default function PostsAndCommentsContainer(props) {
    console.log('Attempted Posts container page')
    return (
        <div className="postPage">
             <Post {...props} posts = {props.posts} />
        </div>
    )
}

