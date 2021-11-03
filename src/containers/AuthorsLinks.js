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
                        <Link to={`${match.url}/${author.id}`} style={{ textDecoration: 'none' }} >
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
                <meta name="description" content="DevBlog authors" />
                <meta name="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content= "DevBlog authors" />
                <meta itemprop="description" content="DevBlog authors" />
                <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content= "Authors list | DevBlog" />
                <meta name="og:description" content="DevBlog authors" />
                <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                <meta name="og:url" content="https://luisdevblog.netlify.app/authors" />
                <meta name="og:site_name" content="DevBlog" />
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>
            <h1>Authors List</h1>
            {authorsList}
        </div>
    )
}