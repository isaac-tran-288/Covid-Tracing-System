import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const SetOfTime = () => {
    const [data, setData] = useState({
        startTime: "",
        endTime: ""
    });

    const [accounts, setAccounts] = useState([]);

    const setStartTime = obj => {
        data.startTime = obj;
    }

    const setEndTime = obj => {
        data.endTime = obj;
    }

    const handleSearch = (e) => {
        e.preventDefault();

        console.log(data);

        if (data.startTime == "" && data.endTime == "") {
            return;
        }

        UserService.timeQuery(data).then(
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
            <h3>CHECK-IN TIME PERIOD </h3>

            <div className="form-group mb-2">
                <label>From</label>
                <Datetime onChange={setStartTime} />
            </div>

            <div className="form-group mb-2">
                <label>To</label>
                <Datetime onChange={setEndTime} />
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

export default SetOfTime;
