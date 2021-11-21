import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilteredHtml from '../utilities/FilteredHtml'
import { Helmet } from 'react-helmet'
// import Interweave from 'interweave'




const  Post = ({match, posts, user, users}) => {

    const [post, setPost] = useState({})
    const [date, setDate] = useState("")
    const [editButton, setEditButton] = useState()
    const [postPicture, setPostPicture] = useState({})


    useEffect(() => { 
        if (posts.length > 0) {
            setPost( () => posts.find(({id}) => `${id}` === match.params.postID)
            )
        }
    },[posts, match.params.postID]);

    // console.log(post)

    useEffect(() => { 
        if ( Object.keys(user).length > 0 ) {
            if ( post.user_id === user.id ) {
                setEditButton(() => <Link to={`/posts/edit/${post.id}`}>Edit post</Link> )
            }
        }
        if ( Object.keys(post).length > 0 ) {
            setPostPicture(post.images[0])
            // console.log(post.images[0])
            let timeSplit = post.creation_time.split(",")
            if (timeSplit[1].trim() === `${new Date().getFullYear()}`) {
                setDate(timeSplit[0]) 
            } else { setDate(post.creation_time) }
        }
    },[post, user]);

    // const author = users.find( author => post.user_id === author.id )



    return(
        <div >
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
                <meta name="og:url" content={"https://luisdevblog.netlify.app/" + post?.id } />
                <meta name="og:site_name" content="DevBlog" />
                {/* LINKEDIN */}
                <meta prefix="og: http://ogp.me/ns#" property='og:title' content={post?.title + " | Posts | DevBlog" }/>
                <meta prefix="og: http://ogp.me/ns#" property='og:image' content= {postPicture?.url || "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"} />
                {/* <meta prefix="og: http://ogp.me/ns#" property='og:description' content={post?.abstract} /> */}
                <meta prefix="og: http://ogp.me/ns#" property='og:url' content={"https://luisdevblog.netlify.app/" + post?.id } />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                <div>{editButton}</div>  
                <div style={{textAlign: 'right'}}>{date}</div>
            </div>
            <div style={{textAlign: 'right'}}>
                {/* <Link to={`/authors/${author?.id}`}>{author?.first_name} {author?.last_name}</Link>  */}
                <Link to={`/authors/${post?.user_id}`}>{post?.author_name}</Link> 
            </div>
            {/* <img src = { post.images && post?.images[0]?.url} alt= {post.images && post?.images[0]?.alt} className="image"/> */}
            <img src = {postPicture?.url} alt= {postPicture?.alt} className="image"/>
            {/* <Interweave  content={post.body} /> */}
            <FilteredHtml content= {post.body} />
        </div>
    )
}
export default Post


