import React from 'react'
import { Link } from 'react-router-dom'

export default function PostLinksContainer({match, posts}) {
    
    const published = posts.filter( post => post.status === "published").map((post,index) => 
        <li key={index}><Link to= {`${match.url}/${post.id}`}>{post.title} </Link></li>
      )
      
    return (
        <div className="postPage postLinks">
            <h1>Post With Embedded Website</h1>
            {/* <iframe 
                width="100%" 
                height="300px" 
                src="https://codesandbox.io/s/epic-night-s704m?file=/src/App.js" 
                frameBorder="0" 
                sandbox="allow-scripts allow-popups allow-popups-to-scape-sandbox allow-same-origin"
                title="sandbox"
            /> */}
            {/* <h1>DFSDFDFDSFDSF</h1>
            <h1>dfdfdf</h1>
            <iframe width="100%" height="auto" src="https://learn-draftjs-now.vercel.app/media-editor-example" frameBorder="0"></iframe>
            <h1>My Youtube Video</h1>
            <iframe width="100%" height="auto" src="https://www.youtube.com/watch?v=5sJ9g6YjTgE" frameBorder="0"></iframe>
            <iframe src="https://www.google.com/" height="500px" width="500px"></iframe>
            <iframe src="https://platform.twitter.com/widgets/tweet_button.html" style={{border: '0', width:'130px', height:'20px'}}></iframe>
            <iframe srcDoc="<html><body>The content you see here will never be affected by the CSS of its parent container. It supposed to be rendered in black on a white background.</body></html>"></iframe>
            <iframe src="https://www.google.com/" height='auto' widht='auto' /> */}
            <h1>Posts List</h1>
            {published}
        </div>
    )
}

