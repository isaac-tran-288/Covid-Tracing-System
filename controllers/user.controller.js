const e = require("express");
const db = require("../models/index.js");
const {Role, User, Public, Business, Tracer, Admin, Terminal, CheckIn} = db;

exports.allAccess = (req, res) => {
    // Perhaps show hotspot activity
    // - list or maps CFS style
    // Link to COVID-19 vaccine booking websites
    // Government announcements
    res.status(200).send("Public Content.");
};

//==========================================================================
// PUBLIC USER FUNCTIONS
//==========================================================================

exports.memberBoard = (req, res) => {
    // Same as public content?
    // Shows the total amount of checkins? - just for a cool reference
    res.status(200).send("Member Content.");
};

//Find the user associated with the input details
//Create a checkin based on the input details (registered user or manual checkin)
exports.checkin = (req, res) => {
    User.findOne({ where: {username: req.body.username}})
    .then(user => {
        if(user) {
            CheckIn.create({
                location: req.body.location,
                UserId: user.id
            });
        } else {
            CheckIn.create({
                location: req.body.location,
                name: req.body.location,
                phone: req.body.phone
            });
        }
    });
};

//==========================================================================
// BUSINESS FUNCTIONS
//==========================================================================

exports.businessBoard = (req, res) => {
    // Government announcements (related to businesses)
    // Number of checkins to their business (all locations)
    res.status(200).send("Business Content.");
};

//==========================================================================
// CONTACT TRACER FUNCTIONS
//==========================================================================

exports.tracerBoard = (req, res) => {
    // Show total number of checkins
    // Can query the database to see checkins
    // - of a particular time period
    // - of a particular location
    // - of a particular person
    res.status(200).send("Contact Tracer Content.");
};

//Query the database to find all business accounts that are awaiting approval
exports.businessApprovals = (req, res) => {
    Business.findAll({where: {approved: false}})
    .then(businesses => {
        res.status(200).send(businesses); 
    });
};

//Query the database to find all contact tracer accounts that are awaiting approval
exports.tracerApprovals = (req, res) => {
    Tracer.findAll({where: {approved: false}})
    .then(tracers => {
        res.status(200).send(tracers); 
    });
};

//Query the database to find all checkins that have a certain location
exports.queryLocation = (req, res) => {
    CheckIn.findAll({where: {location: req.body.location}})
    .then(data => {
        res.status(200).send(data); 
    });
};

//Query the database to find all checkins that fall between a set time period
exports.queryTime = (req, res) => {
    CheckIn.findAll({
        createdAt: {
            $between: [req.body.startDate, req.body.endDate]
        }
    })
    .then(data => {
        res.status(200).send(data); 
    });
};

//Query the database to find all checkins that are connected to a particular user through username or phone
//Username for registered members
//Phone for people doing manual checkin
exports.queryIndividual = (req, res) => {
    Public.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        //If there is a user collect check ins via the user id
        //else get it by the phone number
        if(user) {
            return CheckIn.findAll({where: {UserId: user.id}});
        } else {
            return CheckIn.findAll({where: {phone: req.body.phone}});
        }   
    })
    .then(checkins => {
        res.status(200).send(checkins); 
    });
};

//==========================================================================
// ADMINISTRATOR FUNCTIONS
//==========================================================================

exports.adminBoard = (req, res) => {
    // Show accounts waiting approval
    res.status(200).send("Admin Content.");
};

//==========================================================================
// TERMINAL FUNCTIONS
//==========================================================================

exports.terminalBoard = (req, res) => {
    // Shows the check in form
    res.status(200).send("Terminal Content.");
};

//==========================================================================
// CHECKIN FUNCTIONS
//==========================================================================

exports.createCheckin = (req, res) => {
    let location = "";

    //Find which terminal is logging in
    Terminal.findOne({ where: {serialNumber: req.body.terminalId}})
    .then(terminal => {
        location = terminal.location;
    })
    .then(() => {
        // Find a user in the database if they exist
        return User.findOne({ where: {username: req.body.username}}) 
    })
    .then(user => {
        // Link a check in to the user if there is one
        if(user) {
            CheckIn.create({
                location: location,
                UserId: user.id
            });
        } else { // Create a new check in based off the manual check in
            CheckIn.create({
                location: location,
                name: req.body.name,
                phone: req.body.phone
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

    res.status(200).send("Checked in."); 
};