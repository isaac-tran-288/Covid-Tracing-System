import React from "react";
import authService from "../services/auth.service";

const Confirmation = props => {
    const id = authService.getCurrentTerminal();

    setTimeout(() => {
        props.history.push('/terminal/?id=' + id);
    }, 3000) // render for 5 seconds and then push back to terminal

    return (
        <div className="text-center">
            {/* TODO change the checkIn.png to a colourblind friendly colour */}
            <img src={process.env.PUBLIC_URL + '/assets/checkIn.png'} width="200" height="200" />
            <br></br>
            <br></br>
            <br></br>
            <p>Congratulations Your Check-In is Confirmed</p>
        </div>
        
    )
}

export default Confirmation;