import { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../model/fireStoreModel";
import { signOut } from "firebase/auth";

export default function SignOutPresenter(props) {
    const model = props.model;
    const navigate = useNavigate();
    const location = useLocation();
    const [showConfirmation, setShowConfirmation] = useState(true);


    function handleSignOutACB() {
        signOut(auth)
            .then(function() {
                model.setUser(null); 
                navigate("/");  
            })
            .catch(function(error) {
                console.error(error);
            });
    }

    function handleYesACB() {
        setShowConfirmation(false);
        handleSignOutACB();
    }

    function handleNoACB() {
        const previousPath = location.state?.from || "/";
        navigate(previousPath)
    }

    if (!showConfirmation) {
        return <div>Signing out...</div>;
    }

    return (
        <div className="sign-out-confirmation">
            <div className="confirmation-question">
                <h2>Are you sure you want to sign out?</h2>
                <div className="confirmation-buttons">
                    <button className="yes-btn" onClick={handleYesACB}>
                        Yes
                    </button>
                    <button className="no-btn" onClick={handleNoACB}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
