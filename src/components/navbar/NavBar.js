import React, { useEffect } from 'react';
// MATERIAL UI DEPENDENCIES 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// APP DEPENDENCIES
import { NavLink } from 'react-router-dom'
import auth from '../security/auth'

// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// MAIN FUNCTION, FUNCTIONAL COMPONENT
export default function NavBar(props) {
    console.log(props)
  const classes = useStyles();
// debugger
//   useEffect(() => {
//       setButton()
//   })
//   let button
// //   debugger
// const setButton = () => {
//     const token = localStorage.getItem('token')
//     console.log(token)
//     if (token) {
//       button = 
//           <NavLink 
//               to="/logout"
//               style={{color: 'white', textDecoration: 'none'}} 
//           > <Button color="inherit">Logout</Button>
//           </NavLink>
//           return button
//       } else {
//           button =
//                 <NavLink 
//                     to="/login"
//                     style={{color: 'white', textDecoration: 'none'}} 
//                   > <Button color="inherit">Login</Button>
//                 </NavLink>
//             return button
//       }
//   }



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
             <NavLink 
                to="/"
                style={{color: 'white', textDecoration: 'none'}} 
            >DevBlog   
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink 
                to="/login" 
                style={{color: 'white', textDecoration: 'none'}} 
            >Login
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink 
                to="/logout"
                style={{color: 'white', textDecoration: 'none'}} 
            >Logout
            </NavLink>
          </Typography>
          {props.button}
        </Toolbar>
      </AppBar>
    </div>
  );
}
