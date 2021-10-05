import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import FontSizeChanger from "react-font-size-changer";

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

        <div>
            {/* <FontSizeChanger
                targets={['#target']}
                options={{
                    stepSize: 2,
                    range: 3
                }}
            /> */}
            <div id="target" className="container">


                <header  className="jumbotron">
                    <h3>{content}</h3>
                </header>
            </div>
        </div>
    );
};

export default Home;