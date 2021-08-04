import React from 'react'
// import { useParams } from 'react-router-dom'

const  Post = ({match, posts}) => {
    const currentPost = posts.find(({id}) => id == match.params.postID)
    console.log(currentPost)
    return(
        <div>
            <h1>Title: {currentPost.title}</h1>
            <h1>Body: {currentPost.body}</h1>
        </div>
    )
}

export default Post