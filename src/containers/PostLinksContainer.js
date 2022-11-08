import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { scheduleImagesForDestruction } from '../actions/imageActions'

export default function PostLinksContainer({match, location, posts}) {

    const previousPath = location.state?.from.pathname
    const initial = useSelector((state) => state.images.currentDraftOrPostBodyImages.newImages)
    
    useEffect( () => {
        console.log("posts links useEffect called")
        if( (previousPath?.includes("/profile/drafts/") || previousPath?.includes("/posts/edit/")) && initial.size ) scheduleImagesForDestruction(initial, new Set()) 
        // FATAL ERROR: do not dispatch an action here that updates the 'initial' redux variables included in the dependency array of this useFeect
        // doing so will cause the component to rerender and make the code in useEffect to run again, causing an infinite loop 
    },[previousPath, initial] )
    
    const published = posts.filter( post => post.status === "published").map((post,index) => 
        <li key={index}><h2><Link rel="canonical" to= {`${match.url}/${post.id}`}>{post.title} </Link></h2></li>
      )
      
    return (
        <div className="postPage postLinks">
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>Posts | DevBlog </title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content="DevBlog Posts" />
                <meta name="image" content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content= "DevBlog Posts" />
                <meta itemprop="description" content="DevBlog Posts" />
                <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content= "Posts List | DevBlog" />
                <meta name="og:description" content="DevBlog Posts" />
                <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                <meta name="og:url" content="https://luisdevblog.netlify.app/posts" />
                <meta name="og:site_name" content="DevBlog" />
                {/* LINKEDIN */}
                <meta property='og:title' content= "Posts List | DevBlog" />
                <meta property='og:image' content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                <meta property='og:description' content="DevBlog Posts" />
                <meta property='og:url' content="https://luisdevblog.netlify.app/posts" />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
            <h1>Posts List</h1>
            <ul>{published}</ul>
        </div>
    )
}

