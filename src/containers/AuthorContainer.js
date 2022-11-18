import React from 'react'
import Author from '../components/Author'

export default function AuthorContainer({match, authors}) {

    const id_or_username = match.params.authorID;
    // const author = authors.find( author => `${author.id}` === match.params.authorID)
    const author = authors.find( ({id, username}) => `${id}` === id_or_username || username === id_or_username)

    return (
      <div className='authorPage'>
        <Author author={author} match={match} />
      </div>
    )
}