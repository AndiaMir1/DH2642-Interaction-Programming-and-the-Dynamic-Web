import { useState } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "../model/fireStoreModel";
import { AuthView } from "../Views/authView";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const AuthPresenter= observer(function AuthPresenter(props) {
    const model = props.model;
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");

    function toggleMode() {
        setIsSignUp(!isSignUp);
        setError("");
    }

    function handleAuthError(err) {
        setError(err.message);
    }

    function submit() {
        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(function(userCredential) {
                model.setUser(userCredential.user);
            })
                .catch(handleAuthError);
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then(function(userCredential) {
                model.setUser(userCredential.user);
            })
                .catch(handleAuthError);
        }
    }

    return (
        <AuthView
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            isSignUp={isSignUp}
            toggleMode={toggleMode}
            submit={submit}
            error={error}
        />
    );
});
