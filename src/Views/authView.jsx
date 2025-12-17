import {onEnterKey} from "../utils/viewHandlers";
import "./style/authView.css";
import { eyeImage } from "../images/images";

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
    <div className="auth-view">
      <h1>Here Comes the Song</h1>
      <h2>{props.isSignUp ? "Sign Up" : "Sign In"}</h2>
      <input 
        type="email" 
        value={props.email} 
        placeholder="Email" 
        onChange={handleEmailChangeACB} 
        onKeyDown={onEnterKey(handleSubmitACB)}
      />
      <div className="password-wrapper">
      <input 
        type={props.showPassword ? "text" : "password"} 
        value={props.password} 
        placeholder="Password" 
        onChange={handlePasswordChangeACB} 
        onKeyDown={onEnterKey(handleSubmitACB)}
      />
      <button
      type="button"
      className="show-password-btn"
      onClick={props.togglePasswordVisibility}
      >
        {eyeImage}
      </button>
      </div>

      {props.isSignUp && (
        <input 
          type="text" 
          value={props.currentUsername}
          placeholder="Username" 
          onChange={handleUsernameChangeACB} 
          onKeyDown={onEnterKey(handleSubmitACB)}
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
