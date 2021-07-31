import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { 
    BrowserRouter as Router,
    Route    
} from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Home from './containers/Home'
import ManageLogin from './containers/ManageLogin'
import { authentication } from './actions/securityActions'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute/protectedRoute';
// import auth from './components/security/auth'
import ProfileContainer from './containers/ProfileContainer'
import axios from 'axios'

function App() {
  console.log('App.js was rendered')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authentication())
    setButton()
  })
  // useEffect(() => {
  //   axios.get("posts")
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error))
  // })

  let button
  const token = localStorage.getItem('token')
  // IMPORTANT NOTE: The below 'current_user' comes from a state variable; a state variable is NEEDED for the App component to rerender since the App component is skipped after the user logs in
  // and the 'useEffect' above will not be called; the presence of the state variable ensures that App will rerender after user login 
  // calling the setButton function in useEffect, which will make the "LOGIN" link in navbar to change to "LOGOUT" after the user logs in; and viceversa when the user logs out
  const current_user = useSelector((state) => state.users.current_user)
  const NYTIMESposts = useSelector((state) => state.posts)
  
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
        <Route
            exact path="/"
            render = {routerProps => <Home externalPosts = {NYTIMESposts}  {...routerProps} /> }
        />
        <Route
            exact path="/logout"
            render={routerProps => <Home {...routerProps} /> }
        />
        <ProtectedRoute
            exact path ="/profile"
            component = {ProfileContainer}
            user = {current_user}
            
        />
        <Route
            exact path="/login"
            render={routerProps => <ManageLogin {...routerProps} /> }
        />
        <Route
            exact path="/signup"
            render={routerProps => <ManageLogin {...routerProps} /> }
        />
      </div>
    </Router>
  );
}

export default App;
