import React from "react";

const Confirmation = props => {
    const urlParams = new URLSearchParams(window.location.search);

    setTimeout(() => {
        props.history.push('/terminal/?id=' + urlParams.get('id'));
    }, 3000) // render for 5 seconds and then push back to terminal

    return (
        <div>
            {/* TODO change the checkIn.png to a colourblind friendly colour */}
            <img src={process.env.PUBLIC_URL + '/assets/checkIn.png'} width="100" height="100" />
            <p>Congratulations Your Check-In is Confirmed</p>
        </div>
        
    )
}

export default Confirmation;