import React, { useState, useEffect } from "react";
import Link from "react-router-dom/Link";
import NavDropdown from "react-bootstrap/NavDropdown";

import AuthService from "../../services/auth.service";

const Navbar = () => {
    const [showBusinessBoard, setShowBusinessBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showTracerBoard, setShowTracerBoard] = useState(false);
    const [showPublicBoard, setShowPublicBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowPublicBoard(user.role === "ROLE_PUBLIC");
            setShowBusinessBoard(user.role === "ROLE_BUSINESS");
            setShowAdminBoard(user.role === "ROLE_ADMIN");
            setShowTracerBoard(user.role === "ROLE_TRACER");
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <Link to={"/"} className="navbar-brand margin">
                Covid Checkin System
            </Link>

            <div className="navbar-nav mr-auto">
                {showPublicBoard && (
                    <li className="nav-item">
                        <Link to={"/member"} className="nav-link">
                            Member
                        </Link>
                    </li>
                )}

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
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/tracer"} className="nav-link">
                                Tracer Board
                            </Link>
                        </li>
                        <NavDropdown id="nav-dropdown-dark-example" title="View Checkin" menuVariant="light">
                            <NavDropdown.Item>
                                <Link to={"/tracer/person"} className="nav-link">
                                    View By Person
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={"/tracer/time"} className="nav-link">
                                    View By Time
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={"/tracer/location"} className="nav-link">
                                    View by Location
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className="nav-item justify-content-end">
                        <a href="/home" className="nav-link" onClick={logOut}>
                            LogOut
                        </a>
                    </li>
                </div>
            ) : (

                <div className="navbar-nav ml-auto">
                    <NavDropdown id="nav-dropdown-dark-example" title="Login" menuVariant="light">
                        <NavDropdown.Item>
                            <Link to={"/login"} className="nav-link">
                                User
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/login/business"} className="nav-link">
                                Business
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/login/admin"} className="nav-link">
                                Admin
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/login/tracer"} className="nav-link">
                                Contact Tracer
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/login/terminal"} className="nav-link">
                                Terminal
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown id="nav-dropdown-dark-example" title="Sign Up" menuVariant="light">
                        <NavDropdown.Item>
                            <Link to={"/register"} className="nav-link">
                                User
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/register/business"} className="nav-link">
                                Business
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/register/admin"} className="nav-link">
                                Admin
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/register/tracer"} className="nav-link">
                                Contact Tracer
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            )}

            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/help"} className="nav-link">
                        Help
                    </Link>
                </li>
            </div>


        </nav>
    );
}

export default Navbar;