//buttons and css, go between 
import { Link } from 'react-router-dom';
import "./style/navigationBarView.css";

export default function NavigationBar(props) {
    return (
        <nav className='navigation-bar'>
            <div className='nav-title'>
                <h1>Here Comes The Song</h1>
            </div>

            <div className='nav-links'>
                <Link to="/home"className="nav-button">
                    Home
                </Link>
                <Link to="/weather"className="nav-button">
                    Weather
                </Link>
                <Link to="/friends" className="nav-button">
                Friends
                </Link>
                <Link to="/about"className="nav-button">
                    About us
                </Link>
                <Link to="/profile"className="nav-button">
                    Profile
                </Link>
                <Link to="/logout" className="nav-button">Sign Out
                </Link>
                
            </div>
        </nav>

    );
    
} 