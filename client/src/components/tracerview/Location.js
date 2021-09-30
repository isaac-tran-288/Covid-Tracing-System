import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const Location = () => {
    const [data, setData] = useState({
        location: ""
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
        //e.preventDefault();

        console.log(data);

        if (data.lcoation == "") {
            return;
        }

        UserService.locationQuery(data).then(
            result => {
                console.log(result.data);
                setAccounts(result.data);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <form>
            <h3>CHECK-IN LOCATION</h3>

            <div className="form-group mb-2">
                <label>Specific Location</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter location name"
                    id="location"
                    value={data.location}
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
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(account => {
                                let id = account.userId; //only for registered users
                                let name = account.name;
                                let phone = account.phone;
                                let createdAt = account.createdAt;

                                return (
                                    <tr id={id}>
                                        <td>{name}</td>
                                        <td>{phone}</td>
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

export default Location;