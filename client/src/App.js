import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar/Navbar";

import Login from "./components/Login";
import Register from "./components/Register";

import Home from "./components/Home";
import Profile from "./components/Profile";

import BoardMember from "./components/boards/BoardMember";
import BoardBusiness from "./components/boards/BoardBusiness";
import BoardAdmin from "./components/boards/BoardAdmin";
import BoardTracer from "./components/boards/BoardTracer";

import Terminal from "./components/Terminal";

import SpecificPerson from "./components/tracerview/SpecificPerson";
import SetOfTime from "./components/tracerview/SetOfTime";
import Location from "./components/tracerview/Location";


const App = () => {

    return (
        <div className="App">
            <Navbar />

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        {/* To add new routes simply import the component above and then use the example below */}
                        {/* EXAMPLE */}
                        {/* <Route exact path="/login" render = {props => <Login {...props} title="USER LOGIN" role="public"/>}/> */}

                        {/* The redner = {props => <Login {...props} title="USER LOGIN" role="public"/>} part allows information to be sent from here
                    to the component through the use of props, you can add as many as you like 
                        "Login is the component"
                        {...props} saves any existings props needed/used by React
                        after those to you can add anything you like and access it within the component using props.xxxx 
                    */}


                        {/* Home path for all account, can have general information here */}
                        <Route exact path={"/"} component={Home} />
                        <Route exact path={"/home"} component={Home} />
                        {/* Authentication routes */}
                        <Route exact path="/login" render={props => <Login {...props} title="USER LOGIN" role="public" />} />
                        <Route exact path="/login/business" render={props => <Login {...props} title="BUSINESS LOGIN" role="business" />} />
                        <Route exact path="/login/admin" render={props => <Login {...props} title="ADMINISTRATOR LOGIN" role="admin" />} />
                        <Route exact path="/login/tracer" render={props => <Login {...props} title="CONTACT TRACER LOGIN" role="tracer" />} />
                        <Route exact path="/login/terminal" render={props => <Login {...props} title="TERMINAL LOGIN" role="terminal" />} />

                        <Route exact path="/register" render={props =>
                            <Register {...props} title="PUBLIC REGISTRATION" role="public" />
                        } />

                        <Route exact path="/register/business" render={props =>
                            <Register {...props} title="BUSINESS REGISTRATION" role="business" />
                        } />

                        <Route exact path="/register/admin" render={props =>
                            <Register {...props} title="ADMINISTRATOR REGISTRATION" role="admin" />
                        } />

                        <Route exact path="/register/tracer" render={props =>
                            <Register {...props} title="CONTACT TRACER REGISTRATION" role="tracer" />
                        } />

                        {/* Profile information for the logged in user */}
                        <Route exact path="/profile" component={Profile} />

                        {/* Specific information for user types I.e approving accounts, adding location, etc*/}
                        <Route path="/business" component={BoardBusiness} />
                        <Route path="/member" component={BoardMember} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path="/tracer" component={BoardTracer} />
                        <Route path="/terminal" component={Terminal} />

                        <Route path="/tracer/person" component={SpecificPerson} />
                        <Route path="/tracer/time" component={SetOfTime} />
                        <Route path="/tracer/location" component={Location} />
                    </Switch>
                </div>
            </div>

        </div >

    );
};

export default App;
