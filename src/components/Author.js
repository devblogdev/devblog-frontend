import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImgCardMedia from './decorators/ImgCardMedia'

const Author = ({author}) => {

    const posts = useSelector( (state) => state.posts.posts)

    const authorPosts = useCallback(() => {
        return posts.filter( post => post.user_id === author?.id).map( (post, index) => {
            return  <Link key={index} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                        <ImgCardMedia post={post} imageHeight={"140"}/>
                    </Link>     
        })
    },[posts, author])

    return (
        <div>
            <div>
                <h1>{author?.first_name} {author?.last_name}</h1>
                <p>{author?.bio}</p>
            </div>
            <div className= 'remainderPosts'>
                {authorPosts()}
            </div>
        </div>
    )
}

export default Author