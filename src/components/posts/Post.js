import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FilteredHtml from './FilteredHtml'
import { Helmet } from 'react-helmet'
import { extractBodySlidingWindow } from '../PostEditor/postEditorHelper'
import ProfileImage from '../decorators/ProfileImage'
import CssLoader from '../cssLoader/CssLoader';
import { DiscussionEmbed } from 'disqus-react';
// import Interweave from 'interweave'

const  Post = ({match, posts, user, users}) => {

    const { postID, author_slug, post_slug} = match.params;

    const [post, setPost] = useState({}); 
    const [editButton, setEditButton] = useState()
    const postPicture = useRef({})
    const author = useRef({});

    useEffect(() => { 
        if (posts.length > 0) {
            const temp = posts.find(({id, url}) => (author_slug && (author_slug + "/" + post_slug) === url) || `${id}` === postID);
            setPost(temp);
            // posts load after users, hence author can be set in this conditional (keep an eye, this could change at a later point)
            author.current = users.find(({id}) => id === temp.user_id);
            postPicture.current = temp.images[0];
        }
    },[posts, postID, users, author_slug, post_slug]);
    
    useEffect(() => { 
        if (user['id'] !== undefined) {
            if (post.user_id === user.id) {
                setEditButton(() => <Link to={`/posts/edit/${post.id}`}>Edit post</Link> )
            }
        }
    },[post, user]);
    
    if(post['id'] === undefined) return <CssLoader message="Loading post" />

    return (
        <div className='postSection'>
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>{post.title + " | Posts | DevBlog" }</title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content={post.abstract} />
                <meta name="image" content={postPicture.current?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content={post.title} />
                <meta itemprop="description" content={post.abstract} />
                <meta itemprop="image" content={postPicture.current?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content={post.title} />
                <meta name="og:description" content={post.abstract} />
                <meta name="og:image" content={postPicture.current?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                <meta name="og:url" content={"https://devblog.dev/" + post.url } />
                <meta name="og:site_name" content="DevBlog" />
                {/* LINKEDIN */}
                <meta prefix="og: http://ogp.me/ns#" property='og:title' content={post.title + " | Posts | DevBlog" }/>
                <meta prefix="og: http://ogp.me/ns#" property='og:image' content= {postPicture.current?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <meta prefix="og: http://ogp.me/ns#" property='og:description' content={post?.abstract} /> */}
                <meta prefix="og: http://ogp.me/ns#" property='og:url' content={"https://devblog.dev/" + post.url } />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>

            <div className="authorInfo">
                <ProfileImage 
                    imgSource= {(author.current?.images[0]?.url) || null} 
                    first_name = {author.current.first_name} 
                    last_name = {author.current.last_name}
                    size = "45px" 
                />    
                <div>
                    {/* <Link to={`/authors/${post.user_id}`}>{post.author_name}</Link>  */}
                    <Link to={`/authors/${author.current?.username}`}>{post.author_name}</Link> 
                    <div>{post.creation_time}</div>
                </div>
                {user['id'] !== undefined && post.user_id === user.id 
                    ? <div className='editLink'>{editButton}</div> 
                    : null
                }
            </div>
            <h1>{post.title}</h1>
            {postPicture.current?.url
                ? <div className='cover-image'><img src = {postPicture.current.url} alt= {postPicture.current.alt} className="image"/></div>
                : null
            }
            <FilteredHtml content= {extractBodySlidingWindow(post.body)} />
            <div className='disqus-section'>
                <hr />
                <DiscussionEmbed
                    shortname={process.env.REACT_APP_DISQUS_SHORTNAME || ""}
                    config={
                        {
                            url: `https://devblog.dev/${post.url}`,
                            identifier: `${post.url}`,
                            title: post.title,
                            language: 'en'
                        }
                    }
                />
            </div>
        </div>
        )
        
}
export default Post


