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
import auth from './components/security/auth'


function App() {
  console.log('App.js was rendered')
  const dispatch = useDispatch()

  useEffect(() => {
    // debugger
    // dispatch(authentication())
    setButton()
  })

  let button
  const token = localStorage.getItem('token')
  const current_user = useSelector((state) => state.users.current_user)
  // console.log(current_user)
  const setButton = () => {
      console.log(token)
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
          component = {Home}
        />
        <Route
          exact path="/login"
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
        <Route
          exact path="/signup"
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
        <Route
          exact path="/logout"
          render={routerProps => <Home {...routerProps} /> }
        />
      </div>
    </Router>
  );
}

export default App;
