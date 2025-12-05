import { observer } from "mobx-react-lite";
import React from "react";
import { makeObservable, observable, action } from "mobx";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "../model/fireStoreModel.jsx";
import AuthView from "../views/authView.jsx";
class AuthPresenterClass {
    email = "";
    password = "";
    error = null;
    isSignedUp = false;

    constructor(model) {
        this.model = model;
        this.googleProvider = new GoogleAuthProvider();

        makeObservable(this, {
            email: observable,
            password: observable,
            error: observable,
            isSignedUp: observable,

            setEmail: action.bound,
            setPassword: action.bound,
            setIsSignedUp: action.bound,
            setError: action.bound,

            signInWithEmail: action.bound,
            signInWithGoogle: action.bound,
            signOutUser: action.bound,
        });
    }

    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
    setIsSignedUp(v) { this.isSignedUp = v; }
    setError(msg) { this.error = msg; }

    async signInWithEmail() {
        this.error = null;
        try {
            if (this.isSignedUp) {
                await createUserWithEmailAndPassword(auth, this.email, this.password);
            } else {
                await signInWithEmailAndPassword(auth, this.email, this.password);
            }
        } catch (err) {
            this.setError(err.message);
        }
    }

    async signInWithGoogle() {
        this.error = null;
        try {
            await signInWithPopup(auth, this.googleProvider);
        } catch (err) {
            this.setError(err.message);
        }
    }

    async signOutUser() {
        try {
            await signOut(auth);
            this.model.setUser(null);
        } catch (err) {
            this.setError(err.message);
        }
    }
}

// Wrap presenter in a functional React component
const AuthPresenter = observer(({ model }) => {

    const presenter = React.useMemo(() => new AuthPresenterClass(model), [model]);

    return (
        <AuthView
            email={presenter.email}
            password={presenter.password}
            isSignedUp={presenter.isSignedUp}
            error={presenter.error}

            setEmail={presenter.setEmail}
            setPassword={presenter.setPassword}
            setIsSignedUp={presenter.setIsSignedUp}

            signInWithEmail={presenter.signInWithEmail}
            signInWithGoogle={presenter.signInWithGoogle}
            signOutUser={presenter.signOutUser}
        />
    );
});

export default AuthPresenter;