// Interace for PSG-19

import React, { Component } from "react";

export default class SetOfTime extends Component {
    render() {
        return (
            <form>
                <h3>CHECK-IN TIME PERIOD </h3>

                <div className="form-group mb-2">
                    <label>From</label>
                    <input type="text" className="form-control" placeholder="Please enter time" />
                </div>

                <div className="form-group mb-2">
                    <label>To</label>
                    <input type="text" className="form-control" placeholder="Please enter time" />
                </div>


                <div class="text-center">
                <button type="button" class="btn btn-primary btn-lg btn-block mb-5">CHECK</button>
                </div>     
                           
            </form>
        );
    }
}
