import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Markup} from 'interweave'

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
            <Markup  content={post.body} />            
        </div>
    )
}
export default Post




