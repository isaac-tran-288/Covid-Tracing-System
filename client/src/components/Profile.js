import React from "react";
import AuthService from "../services/auth.service";
import QRCode from 'react-qr-code';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    // const imageUrl = QRCode.toDataURL(currentUser.username);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
                <strong>Role:</strong> {currentUser.role}
            </p>
            {currentUser.role === "ROLE_PUBLIC" && (<div>
                <strong>QR Code:</strong><br />
                
                    <QRCode value={currentUser.username} />

            </div>)
            }
        </div>
    );
};

export default Profile;