import React, { useState, useEffect } from "react";
import "./board.css";
import UserService from "../../services/user.service";

const BoardAdmin = () => {
    const [content, setContent] = useState("");
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
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

    const [data, setData] = useState([]);

    const getBusinessApprovals = (e) => {
        setClicked(true);
        UserService.approvalBusiness().then(
            result => {
                //for each result create a div with account id as id, details as text and accept/reject button
                //console.log(result.data);
                setData(result.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const getTracerApprovals = (e) => {
        setClicked(true);
        UserService.approvalTracers().then(
            result => {
                //for each result create a div with account id as id, details as text and accept/reject button
                console.log(result.data);
                setData(result.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const approve = (e) => {
        let account = {
            id: e.target.closest('.row_account').id,
            type: e.target.closest('.row_account').type
        }

        UserService.approveAccount(account).then(
            result => {
                //change the li to a generic accepted image 
                document.getElementById(account.id).innerHTML = "ACCEPTED";
                document.getElementById(account.id).className += "d-flex justify-content-center";
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const reject = (e) => {
        let account = {
            id: e.target.closest('.row_account').id,
            type: e.target.closest('.row_account').type
        }

        console.log(account);

        UserService.rejectAccount(account).then(
            result => {
                //change the li to a generic rejected image
                document.getElementById(account.id).innerHTML = "REJECTED";
                document.getElementById(account.id).className += "d-flex justify-content-center";
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <div className="container-fluid">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>

            <h3>Waiting approval</h3>

            <div id="button_group" className="d-flex justify-content-around">
                {/* Get all businesses waiting for approval */}
                <button type="button" className="btn btn-secondary" onClick={getBusinessApprovals}>Businesses</button>

                {/* Get all contact tracers waiting for approval */}
                <button type="button" className="btn btn-secondary" onClick={getTracerApprovals}>Contact Tracers</button>
            </div>

            <div>
                {/* if the user has clicked and the type of search result (null or found) */}
                {clicked && (data.length > 0 ? ( data.map(account => {
                    let id = account.id;
                    let name;
                    let type;
                    if('businessName' in account) {
                        name = account.businessName;
                        type = "business";
                    } else {
                        name = account.name;
                        type = "tracer";
                    }
                    
                    return (
                        <li className="row_account" id={id} type={type}>
                            <div className="d-flex justify-content-between">
                                Name: {name} 
                                <br></br> 
                                Email: {account.email}

                                <div>
                                    <button className="image_button">
                                        <img 
                                            title="approve"
                                            className="icon_button"
                                            src={process.env.PUBLIC_URL + '/assets/icon_approve.png'} 
                                            alt="approve" 
                                            onClick={approve}/>
                                    </button>
                                    &#9; {/* <- this is the symbol for a tab space*/}
                                    <button className="image_button">
                                        <img 
                                            title="reject"
                                            className="icon_button"
                                            src={process.env.PUBLIC_URL + '/assets/icon_reject.png'} 
                                            alt="reject" 
                                            onClick={reject}/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                })) : 
                    <li>No approvals waiting.</li>
                )}
            </div>
        </div>
    );
};

export default BoardAdmin;