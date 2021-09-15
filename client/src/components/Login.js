import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import TerminalForm from "./authentication/loginForms/terminal.form";
import UserForm from "./authentication/loginForms/user.form";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    //Some fields will be blank but this does not matter as the backend login
    //function only picks what it needs.
    const [data, setData] = useState({
        username: "",
        password: "",
        role: "",
        //Above is for user login
        //Below is for terminal login
        email: "",
        
        terminalId: "",
        location: "",
    });
    
    //Handle any changes within the form and set the data object accordingly
    const handleDataChange = (e) => {
        const {id, value} = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            data.role = props.role; //add rolename here
            AuthService.login(data).then(
                result => {
                    if(props.role == "terminal") {
                        props.history.push("/terminal/?id=" + result.terminalId);
                        window.location.reload();
                    } else {
                        props.history.push("/profile");
                        window.location.reload();
                    }
                    
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    //NOTE: all the variables and functions that are passed to the
    //forms, can pass all the validation methods regardless of if
    //the form needs it or not.
    const params = {
        data:data,
        handleDataChange:handleDataChange,
        //add in validation methods below
        required:required,
    } 

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <div className="card-title">
                    {props.title}
                </div>

                <Form onSubmit={handleLogin} ref={form}>
                    {/* Determine if logging in a user or a terminal and present the correct form */}
                    {props.role === "terminal" ? (
                        <TerminalForm {...params}/>
                    ) :
                        <UserForm  {...params}/>
                    }

                    <div className="form-group" style={{ marginTop: 20 }}>
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}

                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Login;