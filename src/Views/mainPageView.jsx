import { Routes, Route, useLocation} from "react-router-dom";
import NavigationBar from "./navigationBarView";
import {Profile} from "../Presenters/profilePresenter";
import "./style/mainPageView.css";
import {AuthPresenter} from "../Presenters/authPresenter";
import {CallbackPresenter} from "../Presenters/CallbackPresenter.jsx";
import {FriendsList} from "../Presenters/friendsPresenter";
import {Home} from "../Presenters/homePresenter";
import FriendsProfileView from  "./friendsProfileView.jsx";
import { Feed } from "../Presenters/feedPresenter.jsx";
import {AboutUs} from "../Presenters/aboutUsPresenter.jsx";
import { auth } from "../model/fireStoreModel";
import { signOut } from "firebase/auth";

export function MainPage (props) {  
    const location = useLocation();

    function handleSignOutACB() {
        signOut(auth)
            .then(function() {
                props.model.setUser(null);
            })
            .catch(function(error) {
                console.error(error);
            });
    }

    return (
        <div className="main-page">
            <NavigationBar activePath={location.pathname} onSignOut={handleSignOutACB}/>
 
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
                    <Route path="/friends" 
                    element={<FriendsList model={props.model}/>} />

                    
                    <Route path="/authpage"
                        element={<AuthPresenter model={props.model}/>}
                        />

                    <Route 
                        path="/callback" 
                        element={<CallbackPresenter model={props.model} />} 
                    />

                    <Route
                        path="/about"
                        element={<AboutUs model={props.model} />}
                    />

                    <Route
                        path="/feed"
                        element={<Feed model ={props.model} />}
                     />
                    <Route
                        path="/friendsProfileView"
                        element={<FriendsProfileView uid={props.model.selectedUserUid} />}
                        />
                    {/**
                    <Route
                    path="/dashboard"
                    element={<DashboardPresenter model ={props.model} />}
                    /> */}
                    
                </Routes>
            </div>
        </div>
    );


}