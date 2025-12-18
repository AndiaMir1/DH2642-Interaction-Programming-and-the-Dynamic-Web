import { Routes, Route, useLocation} from "react-router-dom";
import NavigationBar from "./navigationBarView";
import {Profile} from "../Presenters/profilePresenter";
import {Weather} from "../Presenters/weatherPresenter";
import "./style/mainPageView.css";
import SignOutPresenter from "../Presenters/signOutPresenter";
import {AuthPresenter} from "../Presenters/authPresenter";
import CallbackView from "./CallbackView";
import {FriendsList} from "../Presenters/friendsPresenter";
import {Home} from "../Presenters/homePresenter";
import FriendsProfileView from  "./friendsProfileView.jsx";
import { Feed } from "../Presenters/feedPresenter.jsx";
import DashboardPresenter from "../Presenters/dashboardPresenter.jsx";

export function MainPage (props) {  
    const location = useLocation();

    return (
        <div className="main-page">
            <NavigationBar activePath={location.pathname}/>
 
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
                        element={<AuthPresenter model={props.model}/>}
                        />

                    <Route 
                        path="/callback" 
                        element={<CallbackView model={props.model} />} 
                    />

                    <Route
                        path="*"
                        element={<h1>HEJ!</h1>}
                    />

                    <Route
                        path="/feed"
                        element={<Feed model ={props.model} />}
                     />
                    <Route
                        path="/friendsProfileView"
                        element={<FriendsProfileView uid={props.model.selectedUserUid} />}
                        />
                    <Route
                    path="/dashboard"
                    element={<DashboardPresenter model ={props.model} />}
                    />
                    
                </Routes>
            </div>
        </div>
    );


}