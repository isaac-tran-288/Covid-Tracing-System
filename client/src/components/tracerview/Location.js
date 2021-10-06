import React, { useState, useRef } from "react";
import UserService from "../../services/user.service";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

//PDF IMPORTS
import "@progress/kendo-theme-material/dist/all.css";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import "hammerjs";
import "./style.css";

import { Button } from  '@progress/kendo-react-buttons';
import { PDFExport } from  '@progress/kendo-react-pdf';

const Location = () => {
    const [data, setData] = useState({
        location: "",
        startTime: "",
        endTime: "",
        extended: false
    });

    const [pdfData, setPdfData] = useState([
        {
          "product": "Chicken",
          "share": 0.175
        },
        {
          "product": "Pork",
          "share": 0.238
        },
        {
          "product": "Turkey",
          "share": 0.118
        },
        {
          "product": "Kobe Beef",
          "share": 0.052
        },
        {
          "product": "Pickled Herring",
          "share": 0.225
        },
        {
          "product": "Bison",
          "share": 0.192
        }
    ]);

    const [message, setMessage] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [pdfView, setPdfView] = useState(false);
    const [locationCount, setLocationCount] = useState(0);
    const [contactCount, setContactCount] = useState(0);

    const setStartTime = obj => {
        data.startTime = obj;
    }

    const setEndTime = obj => {
        data.endTime = obj;
    }

    const setExtendedTrue = () => {
        data.extended = true;
    }

    const setExtendedFalse = () => {
        data.extended = false;
    }

    const resetAccounts = () => {
        setAccounts([]);
    }

    const filterAccounts = checkins => {
        let locations = [];
        let count = 0;
        let phone = [];
        let users = [];

        //check if they were a user or not
        checkins.forEach(user => {
            //remove any duplicates - use phone number as it is always unique
            if(phone.indexOf(user.phone) === -1) {
                phone.push(user.phone);
                users.push(user);

                if(user.UserId) {
                    count++;
                }
                //count how many different locations there were
                if(locations.indexOf(user.location) === -1) {
                    locations.push(user.location);
                }
            }
        });

        let userShare = count/users.length;
        let nonUserShare = (users.length-count)/users.length;

        let values = [
            {
                "product": "Application Users",
                "share": userShare.toFixed(3)
            },
            {
                "product": "Non-Users",
                "share": nonUserShare.toFixed(3)
            }
        ]

        setPdfData(values);
        setLocationCount(locations.length);
        setContactCount(users.length);
    }

    const generateReport = () => {
        console.log("Generating....");
        setPdfView(true);
    }

    const pdfExportComponent = useRef(null);

    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

    const handleDataChange = (e) => {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSearch = (e) => {
        //e.preventDefault();
        setAccounts([]);
        setMessage("");
        console.log(data);

        if (data.location == "") {
            return;
        }

        UserService.locationQuery(data).then(
            result => {
                if(result.data.length > 0) {
                    console.log(result);
                    filterAccounts(result.data);
                    setAccounts(result.data); 
                } else {
                    setMessage("No checkins for that time period.");
                }

                //reset the data after use
                setData({
                    location: ""
                });
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <div>
        {pdfView === true ? 
            (<div id="example">
                <div className="box wide hidden-on-narrow">
                    <div  className="box-col">
                        <h4>Export PDF</h4>
                        <Button  primary={true}  onClick={handleExportWithComponent}>Export</Button>
                    </div>
                    <div className="box-col" />
                </div>
                <br></br>
                <div className="page-container hidden-on-narrow">
                    <PDFExport  ref={pdfExportComponent}>
                        <div className="pdf-page size-a4">
                            <div className="inner-page">
                                <div className="pdf-header">
                                    <span className="company-logo">
                                        CCS Contact Tracer Report
                                    </span>

                                    <span className="invoice-number">Report #1</span>
                                </div>

                                <div className="pdf-footer">
                                    <p>
                                        Company Name
                                        <br />
                                        Address
                                        <br />
                                        Contact Information
                                    </p>
                                </div>

                                <div className="addresses">
                                    <div className="for">
                                        <h3>Report For</h3>

                                        <p>
                                            SA Health
                                            <br />
                                            11 Hindmarsh Square
                                            <br />
                                            Adelaide, SA, 5000
                                        </p>

                                        <p>
                                            Contacts: {contactCount}
                                            <br />
                                            Locations: {locationCount}
                                            <br />
                                            Checkins: {accounts.length}
                                        </p>
                                    </div>

                                    <div className="from">
                                        <h3>From</h3>

                                        <p>
                                            The Company 
                                            <br />
                                            Mawson Lakes Blvd
                                            <br />
                                            Mawson Lakes, SA, 5095
                                        </p>

                                        <p>
                                            Report ID: 1
                                            <br />
                                            Report Date: {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="pdf-chart">
                                    <Chart style={{ height: 280 }}>
                                        <ChartSeries>
                                            <ChartSeriesItem
                                                type="donut"
                                                data={pdfData}
                                                categoryField="product"
                                                field="share"
                                            >
                                                <ChartSeriesLabels color="#fff" background="none" />
                                            </ChartSeriesItem>
                                        </ChartSeries>
                                    </Chart>
                                </div>
                                <div className="pdf-body">
                                    <div id="grid" />

                                    <p className="signature">
                                        Date: {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </PDFExport>
                </div>
            </div>
            ) 
            : 
            (
            <form>
                <h3>CHECK-IN LOCATION</h3>

                {accounts.length === 0 && (<div>
                    <div className="form-group mb-2">
                        <label>From</label>
                        <Datetime onChange={setStartTime} />
                    </div>

                    <div className="form-group mb-2">
                        <label>To</label>
                        <Datetime onChange={setEndTime} />
                    </div>

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

                    <div className="form-group mb-2">
                        <div className="row text-center">
                            <div className="col-6">
                                <label>Singular</label>
                                <input 
                                    type="radio" 
                                    name="searchExtent" 
                                    title="Limited to just this location." 
                                    onChange={setExtendedFalse}/>
                            </div>
                            <div className="col-6">
                                <label>Extended</label>
                                <input 
                                    type="radio" 
                                    name="searchExtent" 
                                    title="Includes where contacts have checked in afterwards." 
                                    onChange={setExtendedTrue}/>
                            </div>
                        </div> 
                    </div>

                    <div className="text-center">
                        <button onClick={handleSearch} type="button" class="btn btn-primary btn-lg btn-block mb-5">CHECK</button>
                    </div>
                </div>)}

                {accounts.length > 0 && (
                    <div>
                        <div class="text-center">
                            <button onClick={resetAccounts} type="button" class="btn btn-primary btn-lg btn-block mb-5">RESET</button>
                        </div>
                    
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
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
                    </div>
                )}

                {accounts.length > 0 && (
                    <div className="text-right">
                        <button onClick={generateReport} type="button" class="btn btn-primary btn-lg btn-block mb-5">Generate Report</button>
                    </div>
                )}

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

            </form>)}
        </div>
    );
}

export default Location;