import React from "react";

const Terminal = () => {
    return (
        <div>
            Beep boop, I'm a robot.
            Here we can have a form to login to a terminal.
            The credentials can contain a business location, terminalID(spoofed serial number) and business password.
            When submitted, it will create a terminal entry in the database.
            All users entering their details (unique id or manual) will be have their check-in linked to the terminal location.
        </div>
    )
};

export default Terminal;