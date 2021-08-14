import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import PostList from '../components/posts/PostList';
import { Link } from 'react-router-dom'
import ImgCardMedia from '../components/decorators/ImgCardMedia'
import ExternalImgCardMedia from '../components/decorators/ExternalImgCardMedia'

// MAIN COMPONENT; FUNCTIONAL COMPONENT
const Home2 = (props) => {
    
    const dispatch = useDispatch()

    const { posts } = props.posts

    const mainPost = useCallback (() => {
        if (posts?.length > 0) {
                 <Link to={`/posts/${posts[0].id}`} style={{ textDecoration: 'none' }}>
                    <ImgCardMedia post={posts[0] } className="mainPost" imageHeight={"290"}/>
                  </Link>
        }
    },[posts])
  
     
    const featuredPosts = useCallback (() => {
        posts?.slice(1,3).map ( (post, index) => {
            return <Link key={index} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }} >
                        <ImgCardMedia post = {post} height= {100} imageHeight={"200"} />
                    </Link>
        
       })
    },[posts])

    const remainderPosts = useCallback (() => {
        posts?.slice(3).map( (post,index) => {
            if (post.coming_from === "database") {
                return <Link key={index} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }} >
                        <ImgCardMedia post = {post} height= {100} imageHeight={"140"} />
                    </Link>
            }
            return <a key={-index} href={post.url} target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none' }} >
                        <ExternalImgCardMedia key={index} post = {post} />
                </a>
        })
    },[posts])

    
    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
        }
    })

  
    return (
        <div className='home'>
            
            <div className="mainPost">
            <h1>Welcome to DevBlog</h1>
                <h4>{props.loading}</h4>
                {mainPost()} 
            </div>
            <div className="featuredPosts">
                {featuredPosts()}
            </div>
            <div className="remainderPosts">
                {remainderPosts()}
            </div>
            
            {/* <PostList posts ={props.posts} {...props} />  */}
         </div>
    )
}

export default Home2