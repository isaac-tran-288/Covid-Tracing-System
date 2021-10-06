import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";


const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                console.log("Hello");
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div id="target" className="container" style={{ textAlign: "center" }}>
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
            <div>
                <img alt="header" src={process.env.PUBLIC_URL + '/assets/header.png'} width="800" height="200" />
                <div className="row">
                    <div className="col" >
                        <label htmlFor="step1" className="card-title">1</label>
                        <span name="step1">Scan your QR code on the terminal</span>
                    </div>
                    <div className="col">
                        <label htmlFor="step1Manual" className="card-title">OR</label>
                        <span name="step1Manual" >Enter your full name and phone number to check in manually</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <img alt="header" src={process.env.PUBLIC_URL + '/assets/qr_scanner.jpg'} width="300" height="300" />
                    </div>

                    <div className="col">
                        <img alt="header" src={process.env.PUBLIC_URL + '/assets/manual_checkin.png'} width="310" height="310" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <label htmlFor="step2" className="card-title">2</label>
                            <span name="step2">After getting the black tick on the terminal, enter the premises</span>
                        </div>
                        <div className="row" style={{marginTop: "100px"}}>
                            <label htmlFor="step3" className="card-title">3</label>
                            <span name="step2">Follow the prompts</span>
                        </div>
                    </div>

                    <div className="col">
                        <img alt="header" src={process.env.PUBLIC_URL + '/assets/confirm.png'} width="300" height="300" />
                    </div>
                </div>
                <div>
                    <label className="card-title">Remember</label>
                    <ul>
                        <li><span>Do not enter if you are unwell</span></li>
                        <li><span>Say 1.5 meters from others not in your group</span></li>
                        <li><span>Regularly wash or sanitise your hands</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;