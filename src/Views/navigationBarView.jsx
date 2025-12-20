//buttons and css, go between 
import { Link } from 'react-router-dom';
import "./style/navigationBarView.css";
import SignOutPresenter from '../Presenters/signOutPresenter';

export default function NavigationBar({activePath}) {
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
               
                <Link to="/compare-friend-playlists" className={`nav-button ${activePath ==="/dashboard" ? "active" : ""}`}>
                    Compare
                </Link>
                <Link to="/profile" className={`nav-button ${activePath ==="/profile" ? "active" : ""}`}>
                    Profile
                </Link>
                <Link to="/about"className={`nav-button ${activePath ==="/about" ? "active" : ""}`}>
                    About us
                </Link>
            
                <Link 
                    to="/logout" 
                    state={{ from: activePath }}
                    className={`nav-button ${activePath ==="/logout" ? "active" : ""}`}>
                    Sign Out
                </Link>
                 
            </div>
        </nav>

    );
    
} 