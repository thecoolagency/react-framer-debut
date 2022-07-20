import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import MediaQuery from 'react-responsive'
import '../styles/ButtonNav.css'

const Nav = () => {

    const location = useLocation();
    const [navbarOpen, setNavbarOpen] = useState(false)

    const isCurrentURL = (url) => {
        return location.pathname.toLowerCase() === url.toLowerCase();
    }

    const handleToggle = () => {
      setNavbarOpen(prev => !prev)
    }

    return (
        <div className="header">

        {/* LEFT ################################ */}

            <div className="navigation ctr-y flx">

                <MediaQuery minWidth={750}>

                    <ul className="flx fx ml30">
                        <li>{ !isCurrentURL('/') ? <Link to="/">Home</Link> : <span>Home</span> }</li>
                        <li><Link to="/page">Page</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>

                </MediaQuery>

                <MediaQuery maxWidth={749}>

                    <div className="nav-btn p10">
                        <div onClick={handleToggle} className={`hamburger ${navbarOpen ? "open" : ""}`}>
                            <div className="bars link"><span></span><span></span><span></span><div className="other-bar"></div></div>
                        </div>
                    </div>

                    <div className={`nav-menu abs p20 ${navbarOpen ? "" : "slide"}`}>
                        <ul className="fx">
                            <li><Link onClick={handleToggle} to="/">Home</Link></li>
                            <li><Link onClick={handleToggle} to="/page">Page</Link></li>
                            <li><Link onClick={handleToggle} to="/about">About</Link></li>
                        </ul>
                    </div>

                </MediaQuery>

            </div>
            
        {/* MIDDLE ################################ */}

            <div className="heading p10 ctr-xy flx">
                <h1 className="nav m0">
                    <Link to="/">TCA App</Link>
                </h1>
            </div>
            
        {/* RIGHT ################################ */}

            <div className="icons p10 mr20 m-mr0 ctr-y flx j-end">
                <ul className="fx flx">
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>

        </div>

    )
};

export default Nav;
