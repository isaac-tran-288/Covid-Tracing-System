import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../services/user.service";

const Terminal = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getTerminalBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);


    const form = useRef();
    const checkBtn = useRef();

    const [username, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUserName(e.target.value);
    }
    function validateForm() {
        return username.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }


    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
            <div className="card card-container">

                <div className="card-title">
                    COVID-19 CHECKIN
                </div>
                <Form onSubmit={handleSubmit} ref={form}>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="checkin" id="ID" checked />
                            <label className="form-check-label" htmlFor="ID">Username (Unique ID)</label>
                        </div>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={handleChange}
                        //validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="checkin" id="contact" />
                            <label className="form-check-label" htmlFor="ID">Full Name and Phone Number</label>
                        </div>
                        <div className="form-group" >
                            <label htmlFor="name">Full Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                            />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="phone">Phone Number</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="phone"
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: 20 }}>
                        <button className="btn btn-primary btn-block" disabled={loading || !validateForm()}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Check In</span>
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

export default Terminal;
