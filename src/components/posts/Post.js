import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FilteredHtml from './FilteredHtml'
import { Helmet } from 'react-helmet'
import { extractBodySlidingWindow } from '../PostEditor/postEditorHelper'
import ProfileImage from '../decorators/ProfileImage'
// import CssLoader from '../CssLoader/cssLoader'
// import Interweave from 'interweave'

const  Post = ({match, posts, user, users}) => {

    const [post, setPost] = useState({})
    const [date, setDate] = useState("")
    const [editButton, setEditButton] = useState()
    const [postPicture, setPostPicture] = useState({})
    const author = useRef({});

    useEffect(() => { 
        if (posts.length > 0) {
            const temp = posts.find(({id}) => `${id}` === match.params.postID);
            setPost(temp);
            // posts load after users, hence author can be set in this conditional (keep an eye, this could change at a later point)
            author.current = users.find(({id}) => id === temp.user_id);
        }
    },[posts, match.params.postID, users]);
    
    useEffect(() => { 
        if ( Object.keys(user).length > 0 ) {
            if ( post.user_id === user.id ) {
                setEditButton(() => <Link to={`/posts/edit/${post.id}`}>Edit post</Link> )
            }
        }
        if ( Object.keys(post).length > 0 ) {
            setPostPicture(post.images[0])
            setDate(post.creation_time) 
        }
    },[post, user]);

    // const author = users.find( author => post.user_id === author.id )
    return(
        <div className='postSection'>
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>{post?.title + " | Posts | DevBlog" }</title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content={post?.abstract} />
                <meta name="image" content={postPicture?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content={post?.title} />
                <meta itemprop="description" content={post?.abstract} />
                <meta itemprop="image" content={postPicture?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content={post?.title} />
                <meta name="og:description" content={post?.abstract} />
                <meta name="og:image" content={postPicture?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                <meta name="og:url" content={"https://luisdevblog.netlify.app/posts/" + post?.id } />
                <meta name="og:site_name" content="DevBlog" />
                {/* LINKEDIN */}
                <meta prefix="og: http://ogp.me/ns#" property='og:title' content={post?.title + " | Posts | DevBlog" }/>
                <meta prefix="og: http://ogp.me/ns#" property='og:image' content= {postPicture?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <meta prefix="og: http://ogp.me/ns#" property='og:description' content={post?.abstract} /> */}
                <meta prefix="og: http://ogp.me/ns#" property='og:url' content={"https://luisdevblog.netlify.app/posts/" + post?.id } />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
 
            <div className="authorInfo">
                <ProfileImage 
                    imgSource= {(author.current.images && author.current.images[0]?.url) || null} 
                    first_name = {author.current.first_name} 
                    last_name = {author.current.last_name}
                    size = "45px" 
                />    
                <div>
                    <Link to={`/authors/${post?.user_id}`}>{post?.author_name}</Link> 
                    <div>{date}</div>
                </div>
                <div className='editLink'>{editButton}</div>  
            </div>
            <h1>{post.title}</h1>
            {postPicture?.url 
                ? <div className='cover-image'><img src = {postPicture?.url} alt= {postPicture?.alt} className="image"/></div>
                : null
            }
            {/* {!post.body ? <CssLoader message="Loading post" /> : null} */}
            <FilteredHtml content= {extractBodySlidingWindow(post.body || "") || ""} />
        </div>
    )
}
export default Post


