import React from 'react'

const  Post = ({match, posts}) => {
    // debugger
    console.log('Attempted')
    return(
        <div>
            <p>HEkkLLO</p>
            <p>{posts[match.params.postID].title}</p>
        </div>
    )
}

export default Post