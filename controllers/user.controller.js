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

//Approve or reject the account sent through from the frontend
//Data needed
// type - the role the account is
// id - the id of the datatable
exports.approveAccount = (req, res) => {
    let datatable = "";

    console.log(req.body);

    if(req.body.type == "tracer") {
        datatable = Tracer;
    } else if(req.body.type == "business") {
        datatable = Business;
    }

    datatable.update({
        approved: true
    },
    {
        where: 
        {
            id: req.body.id
        }
    })
    .then(account => {
        res.status(200).send(account); 
    });
};

exports.rejectAccount = (req, res) => {
    let datatable = "";
    
    if(req.params.type == "tracer") {
        datatable = Tracer;
    } else if(req.params.type == "business") {
        datatable = Business;
    }

    datatable.findOne({
        where: { id: req.params.id },
        include: [{
            model: User,
            required: true
        }] 
    })
    .then(account => {
        User.destroy({where: {id: account.User.id}});
    })
    .then(() => {
        res.status(200).send("User has been rejected"); 
    });
};

//Query the database to find all checkins that have a certain location
exports.queryLocation = (req, res) => {
    CheckIn.findAll({where: {location: req.params.location}})
    .then(data => {
        res.status(200).send(data); 
    });
};

//Query the database to find all checkins that fall between a set time period
exports.queryTime = (req, res) => {
    // CheckIn.findAll({
    //     createdAt: {
    //         $between: [req.params.startTime, req.params.endTime]
    //     }
    // })

    //raw data search for now
    CheckIn.findAll()
    .then(data => {
        let accounts = [];

        let startTime = new Date(req.params.startTime);
        let endTime = new Date(req.params.endTime);

        data.forEach(account => {
            let checkinTime = new Date(account.createdAt);
            console.log("CHECKIN: " + checkinTime);
            if(checkinTime >= startTime && checkinTime <= endTime) {
                accounts.push(account);
            } else {
                console.log("Out of date range");
            }
        });

        res.status(200).send(accounts); 
    });
};

//Query the database to find all checkins that are connected to a particular user through username or phone
//Username for registered members
//Phone for people doing manual checkin
exports.queryIndividual = (req, res) => {
    Public.findOne({
        include: [{
            model: User,
            where: {username: req.params.username}
        }] 
    })
    .then(user => {
        //If there is a user collect check ins via the user id
        //else get it by the phone number
        if(user) {
            return CheckIn.findAll({where: {UserId: user.User.id}});
        } else {
            return CheckIn.findAll({where: {phone: req.params.phone}});
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
    console.log(req.body);
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
            Public.findOne({where: {UserId: user.id}}).then(public => {
                CheckIn.create({
                    location: location,
                    name: public.name,
                    phone: public.phone,
                    UserId: user.id
                })
                .then(() => {
                    res.status(200).send("Checked in."); 
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
            });
        } else if (req.body.username == "") { // Create a new check in based off the manual check in if username is null
            CheckIn.create({
                location: location,
                name: req.body.name,
                phone: req.body.phone
            })
            .then(() => {
                return res.status(200).send("Checked in."); 
            })
            .catch(err => {
                return res.status(500).send({ message: err.message });
            });
        } else { //not a valid QR code
            return res.status(404).send({ message: "Not a valid QR code" });
        }
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
};