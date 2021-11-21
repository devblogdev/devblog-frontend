import React, { useEffect, useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import { authorization } from './actions/securityActions'
import { fetchPosts } from './actions/postsAndCommentsActions'
import {fetchUsers} from './actions/userActions'
import NavBar from './components/navbar/NavBar'
import Home from './containers/Home'
import PostLinksContainer from './containers/PostLinksContainer';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProfileContainer from './containers/ProfileContainer'
import PostEditor3 from './components/posts/PostEditor3'
import PostsAndCommentsContainer from './containers/PostsAndCommentsContainer'
import AuthorsLinks from './containers/AuthorsLinks'
import AuthorContainer from './containers/AuthorContainer'
import ManageLogin from './containers/ManageLogin'
import Modal from './components/modal/Modal'
import { ModalContext } from './components/modal/ModalContext'
import { Helmet } from 'react-helmet'
// import auth from './components/security/auth'




function App() {

  const dispatch = useDispatch()
  const current_user = useSelector((state) => state.users.current_user)
  const users = useSelector((state) => state.users.users)
  const posts = useSelector((state) => state.posts.posts)
  const loading = useSelector((state) => state.posts.message)
  const token = localStorage.getItem('token')

  // const [displayModeModal, setDisplayModeModal] = useState("hidden")
  // const [modalMessage, setModalMessage] = useState([])

  const { displayModeModal, modalMessage, retrieveModalState } = useContext(ModalContext)
  
  
  const Buttons = useCallback(() => {
    let button
    if (token) {
        button = 
            <NavLink 
                to="/logout"
                style={{color: 'white', textDecoration: 'none'}} 
            > <Button color="inherit">Logout</Button>
            </NavLink>
      } else {
          button =
              <NavLink 
                  to="/login"
                  style={{color: 'white', textDecoration: 'none'}} 
                > <Button color="inherit">Login</Button>
              </NavLink>
      }
      return button
  },[token])

  useEffect(() => {
    dispatch(authorization())
    Buttons()
    console.log('Auhorization dispatcher was called')
  }, [dispatch, Buttons])

  useEffect(() => {
    const endpoint = "/posts"
    dispatch(fetchPosts(endpoint))
    dispatch(fetchUsers("/users"))
    console.log('Posts dispatcher was called')
  }, [dispatch])


  // const retrieveModalState = useCallback ((messageArray, time=3000) => {
  //     const message = messageArray.map((message,index) => {
  //       return <li key={index}>{message}</li>
  //     })
  //     setModalMessage(message)
  //     setDisplayModeModal("")
  //     setTimeout(() => { setDisplayModeModal('hidden')}, time)
  // },[])


  return (
    <Router>
      <div className="App">
        
        <Helmet>
            {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            {/* <!-- COMMON TAGS --> */}
            <title>DevBlog</title>
            {/* <!-- Search Engine --> */}
            <meta name="description" content="Blog website for coding related posts/" />
            <meta name="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
            {/* <!-- Schema.org for Google --> */}
            <meta itemprop="name" content="DevBlog" />
            <meta itemprop="description" content="Blog website for coding related posts" />
            <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
            {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
            <meta name="og:title" content="DevBlog" />
            <meta name="og:description" content="Blog website for coding related posts. " />
            <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
            <meta name="og:url" content="https://luisdevblog.netlify.app" />
            <meta name="og:site_name" content="DevBlog" />
            {/* <!-- Open Graph for LinkedIn & Microsoft --> */}
            <meta property='og:title' content="DevBlog" />
            <meta property='og:image' content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
            {/* <meta property='og:description' content="Blog website for coding related posts" /> */}
            <meta property='og:url' content= "https://luisdevblog.netlify.app" />
            {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
        </Helmet>

        <div className="Nav-addon"></div>
        <NavBar button ={Buttons()} />
        <Modal displayModeModal = {displayModeModal} modalMessage = {modalMessage}/>
        <Container 
          className="main"
          maxWidth="lg"
        >
          <Switch>
            <Route
                exact path="/"
                render = {routerProps => <Home {...routerProps} posts = {posts} loading = {loading} retrieveModalState = {retrieveModalState} /> }
            />
            <Route
                exact path="/posts"
                render = {routerProps => <PostLinksContainer {...routerProps} posts = {posts} /> }
            />
            <Route
                exact path="/logout"
                render={routerProps => <Home {...routerProps}  posts = {posts} /> }
            />
            <ProtectedRoute
                exact path ="/profile"
                component = {ProfileContainer}
                user = {current_user}
                posts = {posts}
                retrieveModalState = {retrieveModalState}
            />
            <ProtectedRoute
                path ="/profile/drafts/new"
                component = {PostEditor3}
                user = {current_user}
                posts = {posts}
                retrieveModalState = {retrieveModalState}
                loading = {loading}
            />
            <ProtectedRoute
                path ="/profile/drafts/:postID"
                component = {PostEditor3}
                user = {current_user}
                posts = {posts}
                retrieveModalState = {retrieveModalState}
                loading = {loading}
            />
            <ProtectedRoute
                path ="/posts/edit/:postID"
                component = {PostEditor3}
                user = {current_user}
                posts = {posts}
                retrieveModalState = {retrieveModalState}
                loading = {loading}
            />
            <Route 
                path={`/posts/:postID`} 
                render= {routerProps => <PostsAndCommentsContainer {...routerProps} posts = {posts} user={current_user} users = {users} />} 
            />
            <Route
                path={'/authors/:authorID'}
                render= {routerProps => <AuthorContainer {...routerProps} authors={users} />}
            />
             <Route
                path={'/authors/:authorID'}
                render= {routerProps => <AuthorContainer {...routerProps} authors={users} />}
            />
            <Route
                exact path="/authors"
                render= {routerProps => <AuthorsLinks {...routerProps} authors={users} />}
            />
            <Route
                exact path="/login"
                render={routerProps => <ManageLogin {...routerProps} retrieveModalState = {retrieveModalState} /> }
            />
            <Route
                exact path="/signup"
                render={routerProps => <ManageLogin {...routerProps} retrieveModalState = {retrieveModalState} /> }
            />   
          </Switch>
        </Container>  
      </div>
    </Router>
  );
}

export default App;
