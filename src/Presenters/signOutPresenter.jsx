import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../model/fireStoreModel";
import SignOutView from "../Views/signOutView";

export default function SignOutPresenter(props) {
    const model = props.model;
    const [showPopUp, setShowPopUp] = useState(false);

    function openPopup() { setShowPopUp(true); }
    function closePopup() { setShowPopUp(false); }

    function handleSignOut() {
        signOut(auth)
            .then(() => {
                model.setUser(null);
                closePopup();
            })
            .catch(error => console.error("Sign out failed:", error));
    }

    return (
        <SignOutView 
            show={showPopUp} 
            onOpen={openPopup} 
            onClose={closePopup} 
            onConfirm={handleSignOut} 
        />
    );
}