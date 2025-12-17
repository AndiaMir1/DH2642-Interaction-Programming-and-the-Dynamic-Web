//buttons and css, go between 
import { Link } from 'react-router-dom';
import "./style/navigationBarView.css";

export default function NavigationBar({activePath}) {
    return (
        <nav className='navigation-bar'>
            <div className='nav-title'>
                <h1>Here Comes The Song</h1>
            </div>

            <div className='nav-links'>
                <Link to="/" className={`nav-button ${activePath ==="/" ? "active" : ""}`}>
                    Home
                </Link>
                <Link to="/weather" className={`nav-button ${activePath ==="/weather" ? "active" : ""}`}>
                    Weather
                </Link>
                <Link to="/friends" className={`nav-button ${activePath ==="/friends" ? "active" : ""}`}>
                    Friends
                </Link>
                <Link to="/profile" className={`nav-button ${activePath ==="/profile" ? "active" : ""}`}>
                    Profile
                </Link>
                <Link to="/about"className={`nav-button ${activePath ==="/about" ? "active" : ""}`}>
                    About us
                </Link>
                <Link to="/feed" className={`nav-button ${activePath ==="/feed" ? "active" : ""}`}>
                    Feed
                </Link>
                <Link to="/logout" className={`nav-button ${activePath ==="/logout" ? "active" : ""}`}>
                    Sign Out
                </Link>
                 
            </div>
        </nav>

    );
    
} 