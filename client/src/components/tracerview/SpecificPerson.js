// Interace for PSG-21

import React, { Component } from "react";

export default class SpecificPerson extends Component {
    render() {
        return (
            <form>
                <h3>List of check-ins for specific person  </h3>

                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Please enter your full name" />
                </div>
                
                <div class="text-center my-3">
                 <p > 
                    <b> OR </b>
                 </p>
                 </div>

                <div className="form-group mb-2">
                    <label>Unique Identifier</label>
                    <input type="text" className="form-control" placeholder="Please enter your nique identifier" />
                </div>


                <div class="text-center">
                <button type="button" class="btn btn-primary btn-lg btn-block mb-5">CHECK</button>
                </div>     
                           
            </form>
        );
    }
}
