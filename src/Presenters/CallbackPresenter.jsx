import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import CallbackView from "../Views/CallbackView.jsx";

export const CallbackPresenter = observer (function CallbackPresenter(props) {
    const navigate = useNavigate();
    const result = props.model.accessTokenFromCodePromiseState;

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const error = params.get("error");

        if(error === "access_denied") {
            navigate("/");
            return;
        }

    if (code && !props.model.accessTokenFromCodePromiseState.promise) {
          props.model.spotifyAcces(code);
         
    }
    
}, []);

    
    useEffect(() => {
        if (result.data) {
            props.model.setSpotifyToken(result.data);
            setTimeout(() => navigate("/"), 1000); 
        }
    }, [result.data, navigate]);

    
   let message = "";
if (!result.promise) message = "Initializing...";
else if (result.promise && !result.data && !result.error)
    message = "Finalizing login...";
else if (result.error)
    message = "Login failed.";
else if (result.data)
    message = "Success! Redirecting...";

    return <CallbackView message={message} />;
});
