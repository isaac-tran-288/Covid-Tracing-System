import React from "react";

const Confirmation = props => {
    setTimeout(() => {
        props.history.push('/terminal')
    }, 4000) // render for 5 seconds and then push back to terminal

    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/assets/checkIn.png'} width="100" height="50" />
            <p>Congratulations Your Check-In is Confirmed</p>
        </div>
        
    )
}

export default Confirmation;