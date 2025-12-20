//buttons and css, go between 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./style/navigationBarView.css";
import "./style/popUp.css";

export default function NavigationBar({activePath, onSignOut}) {
    const [showSignOutPopup, setShowSignOutPopup] = useState(false);

    function handleSignOutClick(e) {
        e.preventDefault();
        setShowSignOutPopup(true);
    }

    function handleYesSignOut() {
        setShowSignOutPopup(false);
        if (onSignOut) {
            onSignOut();
        }
    }

    function handleNoSignOut() {
        setShowSignOutPopup(false);
    }
    return (
        <nav className='navigation-bar'>
            <div className='nav-title'>
                <Link to="/" className="title-link" >
                Here Comes The Song 
                </Link>
            </div>

            <div className='nav-links'>
                <Link to="/" className={`nav-button ${activePath ==="/" ? "active" : ""}`}>
                    Home
                </Link>
                <Link to="/feed" className={`nav-button ${activePath ==="/feed" ? "active" : ""}`}>
                    Feed
                </Link>
               
                <Link to="/dashboard" className={`nav-button ${activePath ==="/dashboard" ? "active" : ""}`}>
                    Dashboard
                </Link>
                <Link to="/profile" className={`nav-button ${activePath ==="/profile" ? "active" : ""}`}>
                    Profile
                </Link>
                <Link to="/about"className={`nav-button ${activePath ==="/about" ? "active" : ""}`}>
                    About us
                </Link>
            
                <button 
                    onClick={handleSignOutClick}
                    className="nav-button signout-btn">
                    Sign Out
                </button>
                 
            </div>

            {showSignOutPopup && (
                <div id="bg-modal">
                    <div className="modal-contact signout-modal">
                        <span className="close" onClick={handleNoSignOut}>&times;</span>
                        <h2>Are you sure you want to sign out?</h2>
                        <div className="signout-buttons">
                            <button className="yes-btn" onClick={handleYesSignOut}>
                                Yes
                            </button>
                            <button className="no-btn" onClick={handleNoSignOut}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
/*hej */
    );
    
} 