import React from 'react'

const PostCard = ({post}) => {

    const {title, abstract, body, images } = post

    let coverPicture 
    
    if (images !== undefined){
        images[0] === undefined ? coverPicture = "IMAGE" : coverPicture = <img src = {images[0].url} alt= {images[0].alt} className="image"/>
    }else {
        images === undefined ? coverPicture = "IMAGE" : coverPicture = <img src = {images[0].url} alt= {images[0].alt}/>
    }
    
    return(
        <React.Fragment>
            <div>
              {coverPicture}
              <h5>{title}</h5>
              <p>{abstract}</p>
              <p>{body}</p>
            </div>
        </React.Fragment>
    )
}

export default PostCard