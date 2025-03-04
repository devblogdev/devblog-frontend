import React from 'react';
// MATERIAL UI DEPENDENCIES 
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// APP DEPENDENCIES
import { NavLink, useLocation } from 'react-router-dom'

// MATERIAL UI STYLES
const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2)
}))

// MAIN FUNCTION, FUNCTIONAL COMPONENT
export default function NavBar(props) {

  const location = useLocation();

  return (
    <div sx={{ flexGrow: 1 }}>
      <AppBar 
        position="relative" 
        style={{
          // backgroundColor: color
        }}
      >
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </MenuButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
             <NavLink 
                  to={{
                    pathname: '/',
                    state: { from: location}
                  }}
                style={{color: 'white', textDecoration: 'none'}} 
            > DevBlog  
            </NavLink>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
             <NavLink 
                to={{
                  pathname: '/posts',
                  state: { from: location}
                }}
                style={{color: 'white', textDecoration: 'none'}} 
            >All Posts   
            </NavLink>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
             <NavLink 
                to={{
                  pathname: '/authors',
                  state: { from: location}
                }}
                style={{color: 'white', textDecoration: 'none'}} 
            >Authors
            </NavLink>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <NavLink 
                to={{
                  pathname: '/profile',
                  state: { from: location}
                }}
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
