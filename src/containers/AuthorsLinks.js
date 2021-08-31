import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthorsLinks({match, authors}) {

    const authorsList = 
            authors.map( (author, index) =>  {
               return <li key={index}><Link to={`${match.url}/${author.id}`}>{author.first_name} {author.last_name}</Link></li>         
            })  
            
    return (
        <div className= 'postPage postLinks'>
            <h1>Authors List</h1>
            {authorsList}
        </div>
    )
}