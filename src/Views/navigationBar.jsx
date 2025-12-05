//buttons and css, go between 
import { Link } from 'react-router-dom'

export default function NavigationBar(props) {
    return (
        <nav className='navigation-bar'>
            <div className='nav-title'>
                <h1>Here Comes The Song</h1>
            </div>

            <div className='nav-links'>
                <Link to="/"className="nav-button">
                    Home
                </Link>
                <Link to="/profile"className="nav-button">
                    Profile
                </Link>
                <Link to="/about"className="nav-button">
                    About us
                </Link>
            </div>
        </nav>

    );
} 