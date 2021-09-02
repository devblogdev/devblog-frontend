import React from 'react'
import { Link } from 'react-router-dom'
import ProfileImage from '../components/decorators/ProfileImage'

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
                                    imgSource= {null} 
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
            <h1>Authors List</h1>
            {authorsList}
        </div>
    )
}