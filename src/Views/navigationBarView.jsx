//buttons and css, go between 
import { Link } from 'react-router-dom';
import "./style/navigationBarView.css";
import "./style/popUp.css";

export default function NavigationBar({activePath, children}) {
   
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
               
                <Link to="/compare-friends-playlists" className={`nav-button ${activePath ==="/compare-friends-playlists" ? "active" : ""}`}>
                    Compare
                </Link>
                <Link to="/profile" className={`nav-button ${activePath ==="/profile" ? "active" : ""}`}>
                    Profile
                </Link>
                <Link to="/about"className={`nav-button ${activePath ==="/about" ? "active" : ""}`}>
                    About us
                </Link>
            
                {children}
                 
            </div>
{/*
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
            )}*/}
        </nav>
    );
    
} 