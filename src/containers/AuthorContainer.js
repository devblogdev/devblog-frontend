import React from 'react'
import Author from '../components/Author'

export default function AuthorContainer({match, authors}) {

    const author = authors.find( author => `${author.id}` === match.params.authorID)

    return (
      <div className='authorPage'>
        <Author author={author} match={match} />
      </div>
    )
}