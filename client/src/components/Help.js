import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Help = () => {
    const [content, setContent] = useState("");

    return (
        <div className="text">
            <header className="jumbotron">
                <h3>{"Phone number:"}</h3>
            </header>
        </div>
    );
};

export default Help;