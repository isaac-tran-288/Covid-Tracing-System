import React from "react";
import { Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar/Navbar";

import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import LoginBusiness from "./components/authentication/LoginBusiness";
import RegisterBusiness from "./components/authentication/RegisterBusiness";
import LoginAdmin from "./components/authentication/LoginAdmin";
import RegisterAdmin from "./components/authentication/RegisterAdmin";
import LoginTracer from "./components/authentication/LoginTracer";
import RegisterTracer from "./components/authentication/RegisterTracer";

import Home from "./components/Home";
import Profile from "./components/Profile";

import BoardMember from "./components/boards/BoardMember";
import BoardBusiness from "./components/boards/BoardBusiness";
import BoardAdmin from "./components/boards/BoardAdmin";
import BoardTracer from "./components/boards/BoardTracer";

import LoginTerminal from "./components/authentication/LoginTerminal";
import Terminal from "./components/Terminal";

const App = () => {

    return (
        <div>
            <Navbar/>

            <div className="container mt-3">
                <Switch>
                    {/* Home path for all account, can have general information here */}
                    <Route exact path={"/"} component={Home} />
                    
                    {/* Authentication routes */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login/business" component={LoginBusiness} />
                    <Route exact path="/register/business" component={RegisterBusiness} />
                    <Route exact path="/login/admin" component={LoginAdmin} />
                    <Route exact path="/register/admin" component={RegisterAdmin} />
                    <Route exact path="/login/tracer" component={LoginTracer} />
                    <Route exact path="/register/tracer" component={RegisterTracer} />
                    <Route exact path="/login/terminal" component={LoginTerminal} />

                    {/* Profile information for the logged in user */}
                    <Route exact path="/profile" component={Profile} />

                    {/* Specific information for user types I.e approving accounts, adding location, etc*/}
                    <Route path="/business" component={BoardBusiness} />
                    <Route path="/member" component={BoardMember} />
                    <Route path="/admin" component={BoardAdmin} />
                    <Route path="/tracer" component={BoardTracer} />
                    <Route path="/terminal" component={Terminal} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
