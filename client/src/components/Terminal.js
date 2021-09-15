import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../services/user.service";
import Scanner from "react-webcam-qr-scanner";


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
    const [formType, setFormType] = useState("qr");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [data, setData] = useState({
        username: "",
        name: "",
        phone: "",
        terminalId: ""
    });

    //Handle any changes within the form and set the data object accordingly
    const handleDataChange = (e) => {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    function validateForm() {
        //return username.length > 0;
        return true;
    }

    function handleFormType(type) {
        setFormType(type);
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
    const handleDecode = (result) => {
        console.log(result.data);
        if (result && result !== "") {
            setFormType("confirm");
            setData(prevState => ({
                ...prevState,
                username: result.data,
            }));
            // handleSumitScan();          
        }
    }

    const handleScannerLoad = (mode) => {
        console.log(mode);
    }

    const handleSumitScan = () => {
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
    };
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>

            <div className="card-title">
                COVID-19 CHECKIN
            </div>

            {formType === "qr" && (
                <div>
                    <label>Scanning QR Code</label>
                    
                    <Scanner
                        className="camera border border-dark"
                        onDecode={handleDecode}
                        onScannerLoad={handleScannerLoad}
                        constraints={{
                            audio: false,
                            video: {
                                facingMode: "environment"
                            }
                        }}
                        captureSize={{ width: 1280, height: 720 }}
                    />
                    <button className="btn btn-primary btn-block" onClick={() => handleFormType("manual")}>
                        <span>Switch To Manual Check-in</span>
                    </button>
                </div>
            )}
            {formType === "manual" && (
                <div>

                    <Form onSubmit={handleSubmit} ref={form}>
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

                    <button className="btn btn-primary btn-block" onClick={() => handleFormType("qr")} style={{ marginTop: 20}} >
                        <span>Switch To QR Scanning</span>
                    </button>
                </div>
            )}
            {
                formType === "confirm" && (
                    <div>

                        <label>{"Username: " + data.username}</label>
                        <button className="btn btn-primary" onClick={handleSumitScan} >Confirm</button>
                        <button className="btn btn-primary" onClick={() => setFormType("qr")} style={{ marginLeft: 10 }} >Go back To Check In</button>
                    </div>
                )
            }
        </div>
    );
};

export default Terminal;
