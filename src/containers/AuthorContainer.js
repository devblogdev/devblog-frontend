import React from 'react'
import Author from '../components/Author'

export default function AuthorContainer({match, history, authors}) {

    const author = authors.find( author => `${author.id}` === match.params.authorID)

    return (
      <div className='home'>
        <Author author={author} history={history} />
      </div>
    )
}