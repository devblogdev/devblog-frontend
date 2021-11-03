import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function PostLinksContainer({match, posts}) {
    
    const published = posts.filter( post => post.status === "published").map((post,index) => 
        <li key={index}><Link to= {`${match.url}/${post.id}`}>{post.title} </Link></li>
      )
      
    return (
        <div className="postPage postLinks">
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>Posts | DevBlog </title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content="DevBlog posts" />
                <meta name="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content= "DevBlog posts" />
                <meta itemprop="description" content="DevBlog posts" />
                <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content= "Posts list | DevBlog" />
                <meta name="og:description" content="DevBlog posts" />
                <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                <meta name="og:url" content="https://luisdevblog.netlify.app/posts" />
                <meta name="og:site_name" content="DevBlog" />
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
            <h1>Posts List</h1>
            {published}
        </div>
    )
}

