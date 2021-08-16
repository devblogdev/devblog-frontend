import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import PostList from '../components/posts/PostList';
import { Link } from 'react-router-dom'
import ImgCardMedia from '../components/decorators/ImgCardMedia'
import ExternalImgCardMedia from '../components/decorators/ExternalImgCardMedia'

// MAIN COMPONENT; FUNCTIONAL COMPONENT
const Home = (props) => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log(props)
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
        } 
        else if (props.location.state?.from.pathname === '/profile') {
            props.history.replace('/')
            props.retrieveModalState(["Please login to access this feature"])
        } 
    })

    const published = props.posts.filter( post => post.status === "published")
    // const published = props.posts.slice()

    const mainPost = useCallback(() => {
        if (published.length > 0) {
          return  <Link to={`/posts/${published[0].id}`} style={{ textDecoration: 'none' }}>
                    <ImgCardMedia post={published[0] } className="mainPost" imageHeight={"290"}/>
                  </Link>
        }
    },[published])
     
    const featuredPosts = published.slice(1,3).map ( (post, index) => {
        return <Link key={index} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }} >
                    <ImgCardMedia post = {post} height= {100} imageHeight={"200"} />
                </Link>
    })

    const remainderPosts = published.slice(3).concat(props.posts.filter( post => post.coming_from !== "database")).map( (post,index) => {
        if (post.coming_from === "database") {
            return <Link key={index} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }} >
                      <ImgCardMedia post = {post} height= {100} imageHeight={"140"} />
                   </Link>
        }
        return <a key={-index} href={post.url} target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none' }} >
                    <ExternalImgCardMedia key={index} post = {post} />
               </a>
        })

    return (
        <div className='home'>
            
            <div className="mainPost">
            <h1>Welcome to DevBlog</h1>
                <h4>{props.loading}</h4>
                {mainPost()} 
            </div>
            <div className="featuredPosts">
                {featuredPosts}
            </div>
            <div className="remainderPosts">
                {remainderPosts}
            </div>
            
            {/* <PostList posts ={props.posts} {...props} />  */}
         </div>
    )
}

export default Home