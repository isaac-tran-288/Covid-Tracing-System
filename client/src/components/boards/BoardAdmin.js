import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

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
        UserService.approvalBusiness().then(
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

    const getTracerApprovals = (e) => {
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
        let data = {
            id: e.target.parentNode.id,
            type: e.target.parentNode.type
        }

        UserService.approveAccount(data).then(
            result => {
                //for each result create a div with account id as id, details as text and accept/reject button
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const reject = (e) => {
        let data = {
            id: e.target.parentNode.id,
            type: e.target.parentNode.type
        }

        UserService.rejectAccount(data).then(
            result => {
                //for each result create a div with account id as id, details as text and accept/reject button
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>

            <h3>Waiting approval</h3>

            <div>
                {/* Get all businesses waiting for approval */}
                <button onClick={getBusinessApprovals}>Businesses</button>

                {/* Get all contact tracers waiting for approval */}
                <button onClick={getTracerApprovals}>Contact Tracers</button>
            </div>

            <div>
                {data.length > 0 ? ( data.map(account => {
                    let id = account.id;
                    let name;
                    let type;
                    if('buinessName' in account) {
                        name = account.businessName;
                        type = "business";
                    } else {
                        name = account.name;
                        type = "tracer";
                    }
                    
                    return (
                        <li id={id} type={type}>{name}<button onClick={approve}>Approve</button><button onClick={reject}>Reject</button></li>
                    )
                })) : 
                    <li></li>
                }
            </div>
        </div>
    );
};

export default BoardAdmin;