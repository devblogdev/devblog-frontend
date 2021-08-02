import React from 'react'

const PostCard = ({post}) => {
    // debugger
    const {title, abstract, images} = post
    // console.log(title)
    return(
        <React.Fragment>
            <div>
              <img src = {images[0].url} alt= {images[0].alt}/>
              <h5>{title}</h5>
              <p>{abstract}</p>
            </div>
        </React.Fragment>
    )
}

export default PostCard