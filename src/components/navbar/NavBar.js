import React from 'react';
// MATERIAL UI DEPENDENCIES 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// APP DEPENDENCIES
import { NavLink, useLocation } from 'react-router-dom'
// import blue from '@material-ui/core/colors/blue';

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
  backgroundColor: "gray"
}));

// MAIN FUNCTION, FUNCTIONAL COMPONENT
export default function NavBar(props) {
    
  const classes = useStyles();
  // const color = blue[700];
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar 
        position="relative" 
        style={{
          // backgroundColor: color
        }}
      >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
             <NavLink 
                to="/"
                style={{color: 'white', textDecoration: 'none'}} 
            > DevBlog  
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
             <NavLink 
                to={{
                  pathname: '/posts',
                  state: { from: location}
                }}
                style={{color: 'white', textDecoration: 'none'}} 
            >All Posts   
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
             <NavLink 
                to={{
                  pathname: '/authors',
                  state: { from: location}
                }}
                style={{color: 'white', textDecoration: 'none'}} 
            >Authors
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink 
                to="/profile" 
                style={{color: 'white', textDecoration: 'none'}} 
            >My Profile
            </NavLink>
          </Typography>

              {/* Login/Logout button; the bottom comes from App.js as a props */}
              {props.button}

        </Toolbar>
      </AppBar>
    </div>
  );
}
