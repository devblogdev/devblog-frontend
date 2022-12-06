import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import DevBlogLogoWhiteColor from '../logo/DevBlogLogoWhiteColor';
import "./bareNav.css";

export const BareNav= (props) => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const token = localStorage.getItem('token');

    const Buttons = () => {
        if (token) {
            return (
                <NavLink 
                    to="/logout"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >Logout
                </NavLink>
            )
        } return (
                <NavLink 
                    to="/login"
                    onClick={() => setMobileOpen(!mobileOpen)}
                  >Login
                </NavLink>
        )
    }

    return (
        <div className="nav">
            <input 
                type="checkbox" 
                id="nav-check" 
                checked={mobileOpen} 
                onChange={() => setMobileOpen(!mobileOpen)}
            />
            <div className="nav-btn">
                <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
                </label>
            </div>
            <div className="nav-header">
                <div className="nav-title">
                    <NavLink 
                        to={{
                            pathname: '/',
                            state: { from: location}
                        }}
                        onClick={() => setMobileOpen(false)}
                    > 
                        <DevBlogLogoFrame
                            child = { <DevBlogLogoWhiteColor navLogo={true} /> }
                            border = "solid 1px"
                            backgroundMinor = { '#9e9e9e' }
                            shape = "6px"
                            height = "30px"
                            width = '54px'
                        />
                    </NavLink>
                </div>
            </div>
            <div className="nav-links">
                <NavLink 
                    to={{
                        pathname: '/',
                        state: { from: location}
                    }}
                    onClick={() => setMobileOpen(false)}
                >Home 
                </NavLink>
                <NavLink 
                    to={{
                        pathname: '/posts',
                        state: { from: location}
                    }}
                    onClick={() => setMobileOpen(false)}
                >All Posts   
                </NavLink>
                <NavLink 
                    to={{
                        pathname: '/authors',
                        state: { from: location}
                    }}
                    onClick={() => setMobileOpen(false)}
                >Authors
                </NavLink>
                <NavLink 
                    to={{
                        pathname: '/profile',
                        state: { from: location}
                    }}
                    onClick={() => setMobileOpen(false)}
                >My Profile
                </NavLink>
                <NavLink 
                    to={{
                        pathname: '/about',
                        state: { from: location}
                    }}
                    onClick={() => setMobileOpen(false)}
                >About
                </NavLink>
                {Buttons()}

                {/* <a href="//github.io/jo_geek" target="_blank">Github</a>
                <a href="http://stackoverflow.com/users/4084003/" target="_blank">Stackoverflow</a>
                <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">LinkedIn</a>
                <a href="https://codepen.io/jo_Geek/" target="_blank">Codepen</a>
                <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">JsFiddle</a> */}
            </div>
        </div>
    )
}
