import { useState } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "../model/fireStoreModel";
import { AuthView } from "../Views/authView";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

export const AuthPresenter= observer(function AuthPresenter(props) {
    const model = props.model;
    const navigate = useNavigate();

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
    setError("");

    if (!email.includes("@")) {
        setError("Invalid email format.");
        return;
    }

    if (isSignUp) {
        if (!username || username.trim() === "") {
            setError("Username is required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        model.searchUser(username.trim());

        try {
            const existingUser = await model.searchUserPromiseState.promise;

            if (existingUser !== null) {
                setError("Username already taken");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            model.setUser(userCredential.user);
            model.setUsername(username.trim());
            navigate("/");

        } catch (err) {
            console.error("Error searching username:", err);
            setError("Could not verify username. Try again.");
        }

    } else {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            model.setUser(userCredential.user);
        } catch (err) {
            handleAuthError(err);
        }
    }
}


    function handleAuthError(err) {
        var errorCode = err.code;
        console.log("hallo");
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
