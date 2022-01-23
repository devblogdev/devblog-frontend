import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PostList from '../components/posts/PostList';
import { Link } from 'react-router-dom'
import ImgCardMedia from '../components/decorators/ImgCardMedia'
import ExternalImgCardMedia from '../components/decorators/ExternalImgCardMedia'

// Home compoenent before integrating interlocking system for posts' body images
const Home = (props) => {
    
    const dispatch = useDispatch()
    const loadingMessage = useSelector((state) => state.posts.message)
    
    useEffect(() => {
        console.log(props)
        // The "/logout" route renders the Home component
        if (props.match.url === "/logout") {
            // If the Home component is rendered because the user clicked on Logout, logout the user and update
            // the url from the user to equal the home page url
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
        } 
        else if (props.location.state?.from.pathname === '/profile') {
            // If the user is not logged in and clicks on "My Profile" on the navbar, the user will be automatically returned
            // to the home page; check whether the Home component was rendered because the user clicked on "My Profile" while not authenticated;
            // if that is the case, display a message to let user know to log in and update the url to reflect the homepage url
            props.history.replace('/')
            props.retrieveModalState(["Please login to access this feature"])
        } 
    })

    const published = props.posts.filter( post => post.status === "published")
    
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
                    <ExternalImgCardMedia key={index} post = {post} imageHeight={'140'} />
               </a>
        })

    return (
        <div className='home'>
            <div className="mainPost">
            <h1>Welcome to DevBlog</h1>
                {/* <h4>{props.loading}</h4> */}
                <h4>{loadingMessage}</h4>
                {mainPost()} 
            </div>
            <div className="featuredPosts">
                {featuredPosts}
            </div>
            <div className="remainderPosts">
                {remainderPosts}
            </div>
         </div>
    )
}

export default Home