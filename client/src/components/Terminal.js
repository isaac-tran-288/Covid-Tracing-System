import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../services/user.service";
import Scanner from "react-webcam-qr-scanner";
import authService from "../services/auth.service";

let initialState = {
    username: "",
    name: "",
    phone: "",
    terminalId: ""
}

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Terminal = props => {
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

    const [data, setData] = useState(initialState);

    const [timer, setTimer] = useState({
        timeoutID: "",
        countDown: 10000 //change this to set the timeout for automatic switch between manual and QR checking
    });

    //Handle any changes within the form and set the data object accordingly
    const handleDataChange = (e) => {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));

        //Clear the current time out and start a new one
        stopCountDownTimer()
        startCountDownTimer();
    };

    //start a countdown, at the end change the form type back to QR and reset the data fields
    function startCountDownTimer() {
        timer.timeoutID = setTimeout(() => {
            setData(initialState);
            setFormType("qr");
        }, timer.countDown)
    }

    function stopCountDownTimer() {
        clearTimeout(timer.timeoutID);
    }

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
            const id = authService.getCurrentTerminal();
            data.terminalId = id;

            UserService.checkin(data).then(
                () => {
                    //Put some confirmation of checkin here
                    setTimeout(() => {
                        props.history.push('/confirmation/?id=' + id);
                    }, 2000); // render for 2 seconds and then push to home
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

                    setTimeout(() => {
                        setFormType("qr");
                        setMessage("");
                    }, 2000);
                }
            );
        } else {
            setLoading(false);
        }

    }

    const handleDecode = (result) => {
        console.log(result.data);
        if (result && result !== "") {
            data.username = result.data;
            setFormType("confirm");
            handleSumbitScan();   
        }
    }

    const handleScannerLoad = (mode) => {
        console.log(mode);
    }

    const handleSumbitScan = () => {
        //Get the current terminals Id to cross check in the backend
        const id = authService.getCurrentTerminal();
        data.terminalId = id;

        UserService.checkin(data).then(
            () => {
                //Put some confirmation of checkin here
                setTimeout(() => {
                    props.history.push('/confirmation/?id=' + id);
                }, 2000); // render for 2 seconds and then push to home
            }, //send an error message if a different QR code was used that is not related to the system
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);

                setTimeout(() => {
                    setFormType("qr");
                    setMessage("");
                }, 2000);
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
                        name="scanner"
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

                    <div className="form-group" style={{ marginTop: 20 }}>
                        <button className="btn btn-primary btn-block" 
                            onClick={() => {
                                handleFormType("manual");
                                startCountDownTimer();
                            }}>
                                <span>Switch To Manual Check-in</span>
                        </button>
                    </div>
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
                                validations={[required]}
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
                                validations={[required]}
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
                        {/* placeholder div so that QR does not constantly restart itself */}

                        {/* <button className="btn btn-primary" onClick={handleSumbitScan} >Confirm</button>
                        <button className="btn btn-primary" onClick={() => setFormType("qr")} style={{ marginLeft: 10 }} >Go back To Check In</button> */}

                        {message ? (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        ) : (
                            <h4>{"Username: " + data.username}</h4>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default Terminal;
