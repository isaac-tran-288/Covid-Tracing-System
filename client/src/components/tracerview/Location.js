// Interface for PSG-17

import React, { Component } from "react";

export default class Location extends Component {
    render() {
        return (
            <form>
                <h3>CHECK-IN LOCATION</h3>

                <div className="form-group mb-2">
                    <label>Specific Location</label>
                    <input type="text" className="form-control" placeholder="Please enter location name" />
                </div>

                <div class="text-center">
                <button type="button" class="btn btn-primary btn-lg btn-block mb-5">CHECK</button>
                </div>     

            </form>
        );
    }
}
