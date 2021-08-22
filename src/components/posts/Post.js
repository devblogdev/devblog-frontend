import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import {Markup} from 'interweave' //Simple markdown; does not transfer links when saving posts
import Interweave from 'interweave'

const  Post = ({match, posts, user}) => {

    const [post, setPost] = useState({})
    const [editButton, setEditButton] = useState()

    useEffect(() => { 
        if (posts.length > 0) {
            setPost( () => posts.find(({id}) => `${id}` === match.params.postID)
            )
        }
    },[posts, match.params.postID]);

    console.log(post)

    useEffect(() => { 
        if ( Object.keys(user).length > 0 ) {
            if ( post.user_id === user.id ) {
                setEditButton(() => <Link to={`/posts/edit/${post.id}`}>Edit post</Link> )
            }
        }
    },[post, user]);

    return(
        <div>
            {editButton}
            <div className="image-single">
                <img src = { post.images && post?.images[0]?.url} alt= {post.images && post?.images[0]?.alt} className="image"/>
            </div>
            <div>
                <Interweave  content={post.body} />
            </div>
        </div>
    )
}
export default Post




