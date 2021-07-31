import React from 'react'

const PostCard = ({title, abstract, url, category }) => {
    return(
        <React.Fragment>
            <div>
                <h4>{title}</h4>
                <p>{abstract}</p>
            </div>
        </React.Fragment>
    )
}

export default PostCard