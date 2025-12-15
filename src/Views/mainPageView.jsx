import { Routes, Route } from "react-router-dom";
import NavigationBar from "./navigationBarView";
import {Profile} from "../Presenters/profilePresenter";
import {Weather} from "../Presenters/weatherPresenter";
import "./style/mainPageView.css";
import SignOutPresenter from "../Presenters/signOutPresenter";
import AuthPage from "./authPage";
import CallbackView from "./CallbackView";
import {FriendsList} from "../Presenters/friendsPresenter";
import {Home} from "../Presenters/homePresenter";

export function MainPage (props) {  
    return (
        <div className="main-page">
            <NavigationBar />

            <div className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<Home model={props.model}/>}
                    />
                    <Route
                        path="/profile"
                        element={<Profile model={props.model} />}
                    />
                    <Route path="/weather" 
                        element={<Weather model={props.model} />}
                    />

                    <Route path="/logout" 
                    element={<SignOutPresenter model={props.model}/>}
                    />
                    <Route path="/friends" 
                    element={<FriendsList model={props.model}/>} />

                    
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