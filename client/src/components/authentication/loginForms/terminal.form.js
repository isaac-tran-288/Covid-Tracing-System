import React from "react";
import Input from "react-validation/build/input";

const TerminalForm = props => {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    value={props.data.email}
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

            {!props.isVerified && (<div className="form-group" style={{ marginTop: 20 }}>
                <button className="btn btn-primary btn-block" onClick={props.Verify} disabled={props.loading}>
                    {props.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Verify</span>
                </button>
            </div>)}

            <div className="form-group">
                <label htmlFor="terminalId">Terminal ID</label>
                <Input
                    type="text"
                    className="form-control"
                    name="terminalId"
                    id="terminalId"
                    disabled={!props.isVerified}
                    value={props.data.terminalId}
                    onChange={props.handleDataChange}
                    validations={[props.required]}
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                    type="text"
                    className="form-control"
                    name="location"
                    id="location"
                    disabled={!props.isVerified}
                    value={props.data.location}
                    onChange={props.handleDataChange}
                    validations={[props.required]}
                >
                    {props.locations.map(address => 
                        <option>{address}</option> )
                    }
                </select>
            </div>
        </div>
    );
}

export default TerminalForm;