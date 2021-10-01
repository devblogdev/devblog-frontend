import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilteredHtml from '../utilities/FilteredHtml'
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


