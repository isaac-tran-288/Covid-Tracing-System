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
        where: 
            {
                location: req.body.location
            }
    })
    .then(data => {
        res.status(200).send(data); 
    });
};

//Query the database to find all checkins that are connected to a particular user through username or phone
exports.queryIndividual = (req, res) => {
    Public.findOne({
        where: {
            $or: [
                {
                    username: req.body.username
                }
            ]
        }
    })
    .then(user => {
        return CheckIn.findAll({where: {UserId: user.id}})
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