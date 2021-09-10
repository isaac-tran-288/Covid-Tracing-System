import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

//import the different forms
import PublicForm from "./authentication/registerForms/public.form";
import BusinessForm from "./authentication/registerForms/business.form";
import TracerForm from "./authentication/registerForms/tracer.form";
import AdminForm from "./authentication/registerForms/admin.form";

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

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [data, setData] = useState({
        username: "",
        password: ""
    });
    
    //Some fields will be blank but this does not matter as the backend registration
    //function only picks what it needs.
    const [account, setAccount] = useState({
        name:"",
        email: "",
        phone: "",
        businessName: "",
        location: {}
    });
    
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    //For handling user data - only ever username and password
    const handleDataChange = (e) => {
        const {id, value} = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    //For handling account data - details relavent to a class
    //I.e email, phone, locations
    const handleAccountChange = (e) => {
        const {id, value} = e.target;
        setAccount(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            data.role = props.role; //Set the role that is passed by App.js
            data.accountInfo = account; //Add the account information to the user data
            AuthService.register(data).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    //NOTE: params is an object all the variables and functions that are 
    //passed to the forms, can pass all the validation methods regardless 
    //of if the form needs it or not.
    const params = {
        //Data handling
        account:account,
        data:data,
        handleAccountChange:handleAccountChange,
        handleDataChange:handleDataChange,
        //Validation methods
        required:required,
        vusername:vusername,
        vpassword:vpassword,
        validEmail:validEmail
    } 

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <div className="card-title">
                    {props.title}
                </div>

                <Form onSubmit={handleRegister} ref={form}>
                    {/* Depending on what role was passed from App.js through props we can load a specific
                    form for registering a user and pass the params object containing the validation and event
                    triggers */}
                    {(!successful && props.role == "public") && (
                        <PublicForm {...params}/>
                    )}

                    {(!successful && props.role == "business") && (
                        <BusinessForm {...params}/>
                    )}

                    {(!successful && props.role == "tracer") && (
                        <TracerForm {...params}/>
                    )}

                    {(!successful && props.role == "admin") && (
                        <AdminForm {...params}/>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert"
                            >
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

export default Register;