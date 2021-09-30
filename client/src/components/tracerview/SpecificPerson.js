import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const SpecificPerson = () => {
    const [data, setData] = useState({
        username: "",
        phone: ""
    });

    const [accounts, setAccounts] = useState([]);

    const handleDataChange = (e) => {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        console.log(data);

        if (data.phone == "" && data.username == "") {
            return;
        }

        UserService.individualQuery(data).then(
            result => {
                console.log(result);
                setAccounts(result.data);

                //reset the data after use
                setData({
                    username: "",
                    phone: ""
                });
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <form>
            <h3>List of check-ins for specific person  </h3>

            <div className="form-group">
                <label>Phone</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter the phone number"
                    id="phone"
                    value={data.phone}
                    onChange={handleDataChange} />
            </div>

            <div class="text-center my-3">
                <p >
                    <b> OR </b>
                </p>
            </div>

            <div className="form-group mb-2">
                <label>Unique Identifier</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter the unique identifier"
                    id="username"
                    value={data.username}
                    onChange={handleDataChange} />
            </div>


            <div class="text-center">
                <button onClick={handleSearch} type="button" class="btn btn-primary btn-lg btn-block mb-5">CHECK</button>
            </div>

            {accounts.length > 0 ? (
                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {/* <th scope="col">Name</th> */}
                                <th scope="col">Location</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(account => {
                                let id = account.userId; //only for registered users
                                let location = account.location;
                                let createdAt = account.createdAt;

                                return (
                                    <tr id={id}>
                                        <td>{location}</td>
                                        <td>{createdAt.toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p></p>
            )}

        </form>
    );
}

export default SpecificPerson;