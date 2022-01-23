import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ImgCardMedia from '../components/decorators/ImgCardMedia'
import ExternalImgCardMedia from '../components/decorators/ExternalImgCardMedia'
import { scheduleImagesForDestruction } from '../actions/imageActions';


// const Home = (props) => {
const Home = ({match, location, history, posts, retrieveModalState}) => {
    
    const dispatch = useDispatch()
    const loadingMessage = useSelector((state) => state.posts.message)
    const previousPath = location.state?.from.pathname
    const initial = useSelector((state) => state.images.currentDraftOrPostBodyImages.newImages)
    
    useEffect(() => {
        // The "/logout" route renders the Home component
        console.log("useEffect in home called")
        console.log(previousPath)
        if (match.url === "/logout") {
            if(initial.size) scheduleImagesForDestruction(initial, new Set()) 
            // If the Home component is rendered because the user clicked on Logout, logout the user and update the url from the user to equal the home page url
            dispatch({type: 'LOGOUT_USER'})
            history.replace('/')
        } 
        else if (previousPath === '/unauthorized') {
            // If the user is not logged in and clicks on "My Profile" on the navbar, the user will be automatically returned to the home page; 
            history.replace('/')
            retrieveModalState(["Please login to access this feature"])
        } 
        if( (previousPath?.includes("/profile/drafts/") || previousPath?.includes("/posts/edit/")) && initial.size ) scheduleImagesForDestruction(initial, new Set()) 
    },[dispatch, history, match.url, previousPath, initial, retrieveModalState])

    const published = posts.filter( post => post.status === "published")
    
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

    const remainderPosts = published.slice(3).concat(posts.filter( post => post.coming_from !== "database")).map( (post,index) => {
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