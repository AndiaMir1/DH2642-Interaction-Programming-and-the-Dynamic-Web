import { useEffect, useState } from "react";
import { getAccessTokenFromCode } from "../apiConfig/musicSource";
import { useNavigate } from "react-router-dom";

export default function CallbackView(props) {
    const navigate = useNavigate();
    const [message, setMessage] = useState("Finalizing login...");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            getAccessTokenFromCode(code)
                .then(token => {
                    console.log("Got Token:", token);
                    //TA BORT SEN
                    localStorage.setItem("spotifyToken", token);
                    props.model.setSpotifyToken(token);
                    
                    setMessage("Success! Redirecting...");
                    setTimeout(() => navigate("/"), 1000);
                })
                .catch(err => {
                    console.error(err);
                    setMessage("Login failed.");
                });
        } else {
            setMessage("No code found in URL.");
        }
    }, [navigate]);

    return <h1>{message}</h1>;
}