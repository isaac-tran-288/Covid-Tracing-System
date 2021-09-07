import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardMember from "./components/BoardMember";
import BoardBusiness from "./components/BoardBusiness";
import BoardAdmin from "./components/BoardAdmin";
import BoardTracer from "./components/BoardTracer";

const App = () => {
    const [showBusinessBoard, setShowBusinessBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showTracerBoard, setShowTracerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowBusinessBoard(user.roles.includes("ROLE_BUSINESS"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowTracerBoard(user.roles.includes("ROLE_TRACER"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Covid Checkin System
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {showBusinessBoard && (
                        <li className="nav-item">
                            <Link to={"/business"} className="nav-link">
                                Business Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {showTracerBoard && (
                        <li className="nav-item">
                            <Link to={"/tracer"} className="nav-link">
                                Tracer Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/member"} className="nav-link">
                                Member
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/member" component={BoardMember} />
                    <Route path="/business" component={BoardBusiness} />
                    <Route path="/admin" component={BoardAdmin} />
                    <Route path="/tracer" component={BoardTracer} />
                </Switch>
            </div>
        </div>
    );
};

export default App;