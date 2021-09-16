import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const Location = () => {
    const [data, setData] = useState({
        location: ""
    });
    const [accounts, setAccounts] = useState([]);

    const handleDataChange = (e) => {
        const {id, value} = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSearch = (e) => {
        //e.preventDefault();

        console.log(data);

        if(data.lcoation == "") {
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
                    onChange={handleDataChange}/>
            </div>

            <div class="text-center">
            <button onClick={handleSearch} type="button" class="btn btn-primary btn-lg btn-block mb-5">CHECK</button>
            </div>   

            {accounts.length > 0 ? (accounts.map(account => {
                console.log(account);
                let id = account.userId; //only for registered users
                let name = account.name;
                let phone = account.phone;
                let createdAt = account.createdAt;
                
                return (
                    <li id={id}>
                        <strong>Name:</strong> {name} <br></br>
                        <strong>Phone:</strong> {phone} <br></br>
                        <strong>Time:</strong> {createdAt}
                    </li>
                )
            }) ) : (
                <li></li>
            )}

        </form>
    );
}

export default Location;