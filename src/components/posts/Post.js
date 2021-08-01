import React from 'react'

export default function Post({match, posts}) {
    debugger
    return(
        <div>
            <p>HELLO</p>
            <p>{match.params}</p>
        </div>
    )
}