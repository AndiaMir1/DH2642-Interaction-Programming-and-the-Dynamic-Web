import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../model/fireStoreModel";
import { signOut } from "firebase/auth";

export default function SignOutPresenter(props) {
    const model = props.model;
    const navigate = useNavigate();

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
    useEffect(function() {
        handleSignOutACB();
    }, []);
}
