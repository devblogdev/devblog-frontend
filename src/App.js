import React, { useEffect, useCallback } from 'react'
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

function App() {

  console.log('App.js was rendered')

  const dispatch = useDispatch()
  const current_user = useSelector((state) => state.users.current_user)
  const posts = useSelector((state) => state.posts.posts)
  console.log(posts)
  const token = localStorage.getItem('token')
  
  
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
 
  return (
    <Router>
      <div className="App">
        <div className="Nav-addon"></div>
        <NavBar button ={Buttons()} />
        <Container 
          className="main"
          maxWidth="lg"
        >
          <Switch>
            <Route
                exact path="/"
                render = {routerProps => <Home {...routerProps} posts = {posts} /> }
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
