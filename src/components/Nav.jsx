import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  useAccount
} from 'wagmi';

const Nav = () => {

    const { isConnected } = useAccount();

    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }
    
  return (
    <>
        <div className="Navigation">

            {isConnected && (
            
                <ul>
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/mint">Mint</Link></li>
                {/*<li><Link to="/mint">Mint</Link></li>*/}
                </ul>
            )}
            
        </div>
    </>
  )
};

export default Nav