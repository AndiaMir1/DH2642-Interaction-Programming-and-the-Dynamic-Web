import { Routes, Route } from "react-router-dom";
import NavigationBar from "./navigationBarView";
import ProfilePresenter from "../Presenters/profilePresenter";
import WeatherPresenter from "../Presenters/weatherPresenter";
import "./style/mainPageView.css";
import SignOutPresenter from "../Presenters/signOutPresenter";
import AuthPage from "./authPage";
import CallbackView from "./CallbackView";
import FriendsPresenter from "../Presenters/friendsPresenter";
import HomePage from "./HomePage.jsx";



export function MainPage (props) {

    
    return (
        <div className="main-page">
            <NavigationBar />

            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/profile"
                        element={<ProfilePresenter />}
                    />
                    <Route path="/weather" 
                        element={<WeatherPresenter />}
                    />

                    <Route path="/logout" 
                    element={<SignOutPresenter model={props.model}/>}
                    />
                    <Route path="/friends" element={<FriendsPresenter />} />

                    
                    
                    <Route path="/authpage"
                        element={<AuthPage model={props.model}/>}
                        />

                    <Route 
                        path="/callback" 
                        element={<CallbackView model={props.model} />} 
                    />

                    <Route
                        path="*"
                        element={<h1>404 - Page Not Found</h1>}
                    />
                    
                </Routes>
            </div>
        </div>
    );


}