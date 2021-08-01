import React from 'react'

const  Post = ({match, posts}) => {
    return(
        <div>
            <h2>HEllo</h2>
            <h3>{posts[match.params.postID].title}</h3>
        </div>
    )
}

export default Post