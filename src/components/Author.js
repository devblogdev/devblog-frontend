import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImgCardMedia from './decorators/ImgCardMedia'
import ProfileImage from './decorators/ProfileImage'
import { Route } from 'react-router-dom'
import AuthorBio from './AuthorBio'
import { Helmet } from "react-helmet"


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
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>{ `${author?.first_name} ${author?.last_name} | Authors | DevBlog`} </title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content={author?.bio.about || "Author at DevBlog"} />
                <meta name="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content= { `${author?.first_name} ${author?.last_name} | DevBlog`} />
                <meta itemprop="description" content={author?.bio.about || "Author at DevBlog"} />
                <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content={ `${author?.first_name} ${author?.last_name} | Authors | DevBlog`} />
                <meta name="og:description" content={author?.bio.about || "Author at DevBlog"} />
                <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                <meta name="og:url" content={"https://luisdevblog.netlify.app/" + author?.id } />
                <meta name="og:site_name" content="DevBlog" />
                {/* LINKEDIN */}
                <meta property='og:title' content={ `${author?.first_name} ${author?.last_name} | Authors | DevBlog`} />
                <meta property='og:image' content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <meta property='og:description' content={author?.bio.about || "Author at DevBlog"} /> */}
                <meta property='og:url' content={"https://luisdevblog.netlify.app/" + author?.id } />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
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