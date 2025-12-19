import { useState } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "../model/fireStoreModel";
import { AuthView } from "../Views/authView";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

export const AuthPresenter= observer(function AuthPresenter(props) {
    const model = props.model;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function toggleMode() {
        setIsSignUp(!isSignUp);
        setError("");
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function handleAuthError(err) {
        setError(err.message);
    }

    async function submit() {

        setError("")

        if (!email.includes("@")) {
        setError("Invalid email format.");
        return;
            }


        if (isSignUp) {
            if(!username || username.trim() === ""){
                setError("Username is required");
                return;
            }
            if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
            }
            const existingUid = await model.findUserUidByUsername(username);
            if(existingUid !==null){
                setError("Username already taken");
                return;
            }
            
            createUserWithEmailAndPassword(auth, email, password)
            .then(function(userCredential) {
                model.setUser(userCredential.user);
                model.setUsername(username);
                
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

    function handleAuthError(err) {
        var errorCode = err.code;

        if(errorCode === "auth/invalid-email") {
            setError("Please enter a valid email address.");
        } else if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password"
            || errorCode === "auth/invalid-credential") {
                setError("Incorrect email and/or password.")
        } else if (errorCode === "auth/email-already-in-use") {
            setError("This email is already linked to an account")
        } else if (errorCode === "auth/weak-password") {
            setError("Password has to 6 or more characters")
        } else if (errorCode === "auth/missing-password") {
            setError("Please enter a password");
        } else {
            setError("An unexpected error occured. Please try again.");
        }
        

    }

    return (
        <AuthView
            email={email}
            password={password}
            username={username}
            setEmail={setEmail}
            setPassword={setPassword}
            setUsername={setUsername}
            isSignUp={isSignUp}
            toggleMode={toggleMode}
            submit={submit}
            error={error}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
        />
    );
});
