import React from 'react'

const PostCard = (props) => {
    // debugger
    const {title, abstract, url, images} = {...props.post}
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