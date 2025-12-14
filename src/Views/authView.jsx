export function AuthView(props) {

    function handleEmailChangeACB(e) {
        props.setEmail(e.target.value);
    }

    function handlePasswordChangeACB(e) {
        props.setPassword(e.target.value);
    }

    function handleUsernameChangeACB(e) {
      props.setUsername(e.target.value);
    }

    function handleToggleACB() {
        props.toggleMode();
    }

    function handleSubmitACB() {
        props.submit();
    }

  return (
    <div>
      <h1></h1>
      <h2>{props.isSignUp ? "Sign Up" : "Sign In"}</h2>
      <input type="email" value={props.email} placeholder="email" onChange={handleEmailChangeACB} />
      <input type="password" value={props.password} placeholder="password" onChange={handlePasswordChangeACB} />

      {props.isSignUp && (
        <input type="username" 
        value={props.currentUsername}
         placeholder="username" 
         onChange={handleUsernameChangeACB} 
         />
)}
      

      {props.error && <div style={{ color: "purple" }}>{props.error}</div>}
      <button onClick={handleSubmitACB}>{props.isSignUp ? "Sign Up" : "Sign In"}</button>
        <p>
        {props.isSignUp ? "Already have an account?" : "Don't have an account?"} 
        <button onClick={handleToggleACB}>{props.isSignUp ? "Sign In" : "Sign Up"}</button>
      </p>
    </div>
  );
}
