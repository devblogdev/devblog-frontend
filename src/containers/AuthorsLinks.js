import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../components/decorators/ProfileImage'
import { Helmet } from 'react-helmet'

export default function AuthorsLinks({match, authors}) {

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
                                <div style={{ fontSize: '21px' } }>
                                    <li>
                                        {author.first_name} {author.last_name} 
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
        <div className= 'postPage postLinks'>
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