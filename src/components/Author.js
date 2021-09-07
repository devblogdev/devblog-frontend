import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImgCardMedia from './decorators/ImgCardMedia'
import ProfileImage from './decorators/ProfileImage'

// import Avatar from '@material-ui/core/Avatar';

const Author = ({author}) => {
    
    const posts = useSelector( (state) => state.posts.posts)
    
    const authorPosts = useCallback(() => {
        if (posts.length > 0) {
          return posts.filter( post => post.user_id === author?.id).map( (post, index) => {
            return  <Link key={index} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                        <ImgCardMedia post={post} imageHeight={"140"}/>
                    </Link>     
          })
        }
    },[posts, author])

    return (
        <div>
            <div>
                <ProfileImage 
                    imgSource= {null}
                    first_name= {author?.first_name}
                    last_name={author?.last_name}
                />
                <h2>{author?.first_name} {author?.last_name}</h2>
                {/* <p>{author?.bio}</p> */}
            </div>
            <div className= 'remainderPosts'>
                {authorPosts()}
            </div>
        </div>
    )
}

export default Author