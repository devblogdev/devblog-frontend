import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../components/decorators/ProfileImage'
import { Helmet } from 'react-helmet'
import { scheduleImagesForDestruction } from '../actions/imageActions'
import { useSelector } from 'react-redux'

export default function AuthorsLinksContainer({match, location, authors }) {

    const previousPath = location.state?.from.pathname
    const initial = useSelector((state) => state.images.currentDraftOrPostBodyImages.newImages)
    
    useEffect( () => {
        console.log("authors container useEffect called")
        // 'previousPath' is undefined when page first loads; add '?' to prevent app from crashing
        if( (previousPath?.includes("/profile/drafts/") || previousPath?.includes("/posts/edit/")) && initial.size ) scheduleImagesForDestruction(initial, new Set()) 
        // FATAL ERROR: do not dispatch an action here that updates the 'initial' redux variables included in the dependency array of this useFeect
        // doing so will cause the component to rerender and make the code in useEffect to run again, causing an infinite loop 
    },[previousPath, initial] )
 
    
    const authorsList = 
            authors.map( (author, index) =>  {
               return (
                    <div 
                        key={index}
                        style={{
                            marginTop: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        <Link rel="canonical" to={`${match.url}/${author.id}`} style={{ textDecoration: 'none' }} >
                            <div
                                style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    justifyItems: 'start',
                                    gridTemplateAreas: `
                                                'link . picture'
                                            `
                                }}
                            >
                                <div>
                                    <li>
                                        <h2>
                                            {author.first_name} {author.last_name} 
                                        </h2>
                                    </li> 
                                </div>
                                <ProfileImage 
                                    imgSource= {author?.images[0]?.url || null} 
                                    first_name = {author.first_name} 
                                    last_name = {author.last_name}
                                    size = "40px" 
                                />    
                            </div>
                        </Link> 
                    </div>
               )
            })  
            
    return (
        <div className= 'authorListPage authorLinks'>
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>Authors | DevBlog </title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content="DevBlog Authors" />
                <meta name="image" content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content= "DevBlog Authors" />
                <meta itemprop="description" content="DevBlog Authors" />
                <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content= "Authors List | DevBlog" />
                <meta name="og:description" content="DevBlog Authors" />
                <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                <meta name="og:url" content="https://luisdevblog.netlify.app/authors" />
                <meta name="og:site_name" content="DevBlog" />
                {/* LINKEDIN */}
                <meta property='og:title' content= "Authors List | DevBlog" />
                <meta property='og:image' content="https://user-images.githubusercontent.com/75151961/142552680-369cf146-fe13-443d-b1ca-a0e0b86c53d7.png" />
                <meta property='og:description' content="DevBlog Authors" />
                <meta property='og:url' content="https://luisdevblog.netlify.app/authors" />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
            <h1>Authors List</h1>
            {authorsList}
        </div>
    )
}