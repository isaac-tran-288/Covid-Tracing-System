import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import "./board.css";

import UserService from "../../services/user.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const BoardBusiness = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [content, setContent] = useState("");
    const [locations, setLocations] = useState([]);
    const [showLocations, setShowLocations] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [data, setData] = useState({
        location: ""
    });

    useEffect(() => {
        UserService.getBusinessBoard().then(
            (response) => {
                console.log(response);
                setContent(response.data.content);
                setLocations(response.data.locations);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    //Handle any changes within the form and set the data object accordingly
    const handleDataChange = (e) => {
        const {id, value} = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSaveLocation = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            //add the new location to the existing array if not already in there
            if(locations.indexOf(data.location) < 0) {
                locations.push(data.location); 
                updateLocations();
            }
            else {
                setMessage("Location already in database.");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    //update the locations array in the database
    const updateLocations = () => {
        let information = {
            locations: locations,
            email: JSON.parse(localStorage.getItem("user")).email
        }

        UserService.newBusinessLocation(information).then(
            result => {
                //set the locations to the newly returned array
                document.getElementById("location").innerHTML = "";
                setLocations(result.data);
                setLoading(false);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    }

    //update the locations array in the database
    const removeLocation = e => {
        let index = e.target.closest('.row_account').id;
        let temp = locations;
        temp.splice(index, 1);
        setLocations(temp);
        updateLocations();
    }

    //toggle between showing the business locations
    const toggleLocations = () => {
        setShowLocations(!showLocations);
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>

            <Form id="addLocationForm" onSubmit={handleSaveLocation} ref={form}>
                {/* Determine if logging in a user or a terminal and present the correct form */}
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="location"
                        id="location"
                        value={data.location}
                        onChange={handleDataChange}
                        validations={[required]}
                    />
                </div>

                <div className="form-group" style={{ marginTop: 20 }}>
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Save Location</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>

            <br></br>
            <br></br>

            <button className="btn btn-info text-white" onClick={toggleLocations}>Toggle Locations</button>

            <br></br>
            <br></br>

            {showLocations && (locations.length > 0 ? (locations.map(location => {
                let id = locations.indexOf(location);
                
                return (
                    <li className="row_account" id={id}>
                        <div className="d-flex justify-content-between">
                            {location}

                            <button className="image_button">
                                <img 
                                    title="delete"
                                    className="icon_button"
                                    src={process.env.PUBLIC_URL + '/assets/icon_reject.png'} 
                                    alt="delete" 
                                    onClick={removeLocation}/>
                            </button>
                        </div>
                    </li>
                )
            })) : 
                <li>No locations added.</li>
            )}
        </div>
    );
};

export default BoardBusiness;