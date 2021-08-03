import React from 'react'
import { Link } from 'react-router-dom'


export default function PostLinksContainer(props) {
    const published = props.posts.filter( post => post.status === "published").map((post,index) => 
    <li><Link to= {`/posts/${post.id}`} key={index} >
      {post.body}
    </Link>
    </li>
    )
    return (
        <div>
            {published}
        </div>
    )
}