import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImgCardMedia from './decorators/ImgCardMedia'
import ProfileImage from './decorators/ProfileImage'
import { Route } from 'react-router-dom'
import AuthorBio from './AuthorBio'


// import Avatar from '@material-ui/core/Avatar';

const Author = ({match, author}) => {
    
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
                    imgSource= {author?.images[0]?.url || null}
                    first_name= {author?.first_name}
                    last_name={author?.last_name}
                />
                <h2>{author?.first_name} {author?.last_name}</h2>
                
                    {
                        author?.bio && author ? (
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        marginBottom: '16px'
                                    }}   
                                > 
                                    <Link to={ `${match.url}/about`} >
                                          About
                                    </Link>
                                    <Link to={ `${match.url}/contact`} >
                                          Contact
                                    </Link>
                                </div>
                                <div>
                                    <Route
                                        path = {`${match.path}/about`}
                                    >
                                        <AuthorBio author={author} criteria = "about" />
                                    </Route>
                                    <Route
                                        path = {`${match.path}/contact`}
                                    >
                                        <AuthorBio author={author} criteria = "contact" />
                                    </Route>
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }  
            </div>
            <div className= 'remainderPosts'>
                {authorPosts()}
            </div>
        </div>
    )
}

export default Author