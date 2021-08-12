import React from 'react'
import { Link } from 'react-router-dom'

export default function PostLinksContainer({match, posts}) {
    
    const published = posts.filter( post => post.status === "published").map((post,index) => 
        <li key={index}><Link to= {`${match.url}/${post.id}`}>{post.title}</Link></li>
      )
      
    return (
        <div className="postPage">
            <h1>Posts List</h1>
            {published}
        </div>
    )
}