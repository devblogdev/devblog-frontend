import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';

export default function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">

                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img src='DevBlog.png' alt="logo" height="60px"></img>
                            DevBlog
                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                        
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        
                        <li className='nav-item'>
                            <Link to="/posts" className="nav-links" onClick={closeMobileMenu}>
                                Posts
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/authors" className="nav-links" onClick={closeMobileMenu}>
                                Authors
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                                My profile
                            </Link>
                        </li>
                        <li className='nav-item nav-links' onClick={closeMobileMenu}>
                            
                                {props.button}
                            
                        </li>
                    
                        
                    </ul>
                    
                </div>
            </nav>
        </>
    )
}
