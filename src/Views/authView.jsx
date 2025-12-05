export function AuthView(props) {
    return (
        <div className="auth-view">
            <h2>{props.isSignedUp ? "Sign Up" : "Sign In"}</h2>
            <input
                type="email"
                placeholder="Email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
            />
            <button onClick={props.signInWithEmail}>
                {props.isSignedUp ? "Sign Up" : "Sign In"}
            </button>
            <button onClick={props.signInWithGoogle}>
                Sign In with Google
            </button>
            <p onClick={() => props.setIsSignedUp(!props.isSignedUp)}>
                {props.isSignedUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
            </p>
            {props.error && <p className="error-message">{props.error}</p>}
        </div>
    );
}   
