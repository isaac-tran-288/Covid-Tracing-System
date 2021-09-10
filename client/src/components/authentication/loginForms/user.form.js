import React from "react";
import Input from "react-validation/build/input";

const UserForm = props => {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    value={props.data.username}
                    onChange={props.handleDataChange}
                    validations={[props.required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={props.data.password}
                    onChange={props.handleDataChange}
                    validations={[props.required]}
                />
            </div>
        </div>
    );
}

export default UserForm;
