import React from 'react'
import { Link } from 'react-router-dom'

export default function PostLinksContainer({match, posts}) {
    
    const published = posts.filter( post => post.status === "published").map((post,index) => 
        <li key={index}><Link to= {`${match.url}/${post.id}`}>{post.body}</Link></li>
      )
    return (
        <div>
            {published}
        </div>
    )
}