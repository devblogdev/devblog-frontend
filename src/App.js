import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Home from './containers/Home'
import ManageLogin from './containers/ManageLogin'
import { authentication, authorization } from './actions/securityActions'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProfileContainer from './containers/ProfileContainer'
import PostsAndCommentsContainer from './containers/PostsAndCommentsContainer'
import { fetchPosts } from './actions/postsAndCommentsActions'
import PostForm from './components/posts/PostEditor'
import PostLinksContainer from './containers/PostLinksContainer';
import Container from '@material-ui/core/Container';
import PostEditor2 from './components/posts/PostEditor2'


function App() {

  console.log('App.js was rendered')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authorization())
    console.log("authorization")
    
    setButton()
  }, [dispatch])

  useEffect(() => {
    const endpoint = "/posts"
    dispatch(fetchPosts(endpoint))
    console.log("Fetch posts")
  }, [dispatch])
 
  // IMPORTANT NOTE: The below 'current_user' comes from a state variable; a state variable is NEEDED for the App component to rerender since the App component is skipped after the user logs in
  // and the 'useEffect' above will not be called; the presence of the state variable ensures that App will rerender after user login 
  // calling the setButton function in useEffect, which will make the "LOGIN" link in navbar to change to "LOGOUT" after the user logs in; and viceversa when the user logs out
  let button
  const token = localStorage.getItem('token')
  const current_user = useSelector((state) => state.users.current_user)
  const posts = useSelector((state) => state.posts.posts)
  console.log(posts)

  const setButton = () => {
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
  }
 
  return (
    <Router>
      <div className="App">

        <NavBar button ={setButton()} />
        <Container 
          className="app-container"
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
              component = {PostEditor2}
              user = {current_user}
              posts = {posts}
          />
          <ProtectedRoute
              path ="/profile/drafts/:postID"
              component = {PostEditor2}
              user = {current_user}
              posts = {posts}
          />
          <ProtectedRoute
              path ="/posts/edit/:postID"
              component = {PostEditor2}
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
