import { Routes, Route } from "react-router-dom";
import NavigationBar from "./navigationBarView";
import ProfilePresenter from "../Presenters/profilePresenter";
import WeatherPresenter from "../Presenters/weatherPresenter";
import "./style/mainPageView.css";
import SignOutPresenter from "../Presenters/signOutPresenter";
import AuthPage from "./authPage";
import FriendsPresenter from "../Presenters/friendsPresenter";



export function MainPage (props) {

    
    return (
        <div className="main-page">
            <NavigationBar />

            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<h1>Welcome to Here Comes the Song</h1>}
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
                        path="*"
                        element={<h1>404 - Page Not Found</h1>}
                    />
                    
                </Routes>
            </div>
        </div>
    );


}