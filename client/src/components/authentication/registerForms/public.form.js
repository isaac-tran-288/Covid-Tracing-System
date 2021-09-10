import React from "react";
import Input from "react-validation/build/input";

const PublicForm = props => {
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
                    validations={[props.required, props.vusername]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <Input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={props.account.name}
                    onChange={props.handleAccountChange}
                    validations={[props.required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    value={props.account.email}
                    onChange={props.handleAccountChange}
                    validations={[props.required, props.validEmail]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={props.account.phone}
                    onChange={props.handleAccountChange}
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
                    validations={[props.required, props.vpassword]}
                />
            </div>

            <div className="form-group" style={{ marginTop: 20 }} >
                <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
        </div>
    );
}

export default PublicForm;
