import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import { authorization } from './actions/securityActions'
import { fetchPosts } from './actions/postsAndCommentsActions'
import NavBar from './components/navbar/NavBar'
import Home from './containers/Home'
import PostLinksContainer from './containers/PostLinksContainer';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProfileContainer from './containers/ProfileContainer'
import PostEditor from './components/posts/PostEditor'
import PostsAndCommentsContainer from './containers/PostsAndCommentsContainer'
import ManageLogin from './containers/ManageLogin'
import Modal from '../src/components/Modal'

function App() {

  console.log('App.js was rendered')

  const dispatch = useDispatch()
  const current_user = useSelector((state) => state.users.current_user)
  const posts = useSelector((state) => state.posts.posts)
  const loading = useSelector((state) => state.posts.message)
  console.log(posts)
  const token = localStorage.getItem('token')

  const [displayModeModal, setDisplayModeModal] = useState("hidden")
  const [modalMessage, setModalMessage] = useState([])
  
  
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
    console.log("authorization called")
  }, [dispatch, Buttons])

  useEffect(() => {
    const endpoint = "/posts"
    dispatch(fetchPosts(endpoint))
    console.log("Fetch posts")
  }, [dispatch])

  
  const retrieveModalState = useCallback ((messageArray, time=3000) => {
      const message = messageArray.map((message,index) => {
        return <li key={index}>{message}</li>
      })
      setModalMessage(message)
      setDisplayModeModal("")
      setTimeout(() => { setDisplayModeModal('hidden')}, time)
  },[])
 
  return (
    <Router>
      <div className="App">
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
                render = {routerProps => <Home {...routerProps} posts = {posts} loading = {loading}/> }
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
            />
            <ProtectedRoute
                path ="/profile/drafts/new"
                component = {PostEditor}
                user = {current_user}
                posts = {posts}
            />
            <ProtectedRoute
                path ="/profile/drafts/:postID"
                component = {PostEditor}
                user = {current_user}
                posts = {posts}
                retrieveModalState = {retrieveModalState}
            />
            <ProtectedRoute
                path ="/posts/edit/:postID"
                component = {PostEditor}
                user = {current_user}
                posts = {posts}
            />
            <Route 
                path={`/posts/:postID`} 
                render= {routerProps => <PostsAndCommentsContainer {...routerProps} posts = {posts} user={current_user} />} 
            />
            <Route
                exact path="/login"
                render={routerProps => <ManageLogin {...routerProps} /> }
            />
            <Route
                exact path="/signup"
                render={routerProps => <ManageLogin {...routerProps} /> }
            />      
          </Switch>
        </Container>  
      </div>
    </Router>
  );
}

export default App;
