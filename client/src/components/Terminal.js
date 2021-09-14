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

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [data, setData] = useState({
        username: "",
        name: "",
        phone: ""
    });

    //Handle any changes within the form and set the data object accordingly
    const handleDataChange = (e) => {
        const {id, value} = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    function validateForm() {
        //return username.length > 0;
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        if (checkBtn.current.context._errors.length === 0) {
            //Get the current terminals Id to cross check in the backend
            const urlParams = new URLSearchParams(window.location.search);
            data.terminalId = urlParams.get('id');
            UserService.checkin(data).then(
                () => {
                    //Put some confirmation of checkin here
                    window.location.reload();                    
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
                            name="username" //add id
                            id="username"
                            value={data.username}
                            onChange={handleDataChange}
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
                                id="name"
                                value={data.name}
                                onChange={handleDataChange}
                            />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="phone">Phone Number</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="phone"
                                id="phone"
                                value={data.phone}
                                onChange={handleDataChange}
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
