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

        if(data.startTime == "" && data.endTime == "") {
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

            {accounts.length > 0 ? (accounts.map(account => {
                let id = account.userId; //only for registered users
                let name = account.name;
                let phone = account.phone;
                let createdAt = account.createdAt;
                
                return (
                    <li id={id}>
                        <strong>Name:</strong> {name} <br></br>
                        <strong>Phone:</strong> {phone}<br></br>
                        <strong>Time:</strong> {createdAt}
                    </li>
                )
            })) : (
                <li></li>
            )}  
                        
        </form>
    );
}

export default SetOfTime;
