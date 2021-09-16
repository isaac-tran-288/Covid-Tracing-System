const db = require("../models/index.js");
const config = require("../config/auth.config");
const {Role, User, Public, Business, Tracer, Admin, Terminal} = db;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    //should be given a data type of the following
    //data = {
    //  role: "public",    
    //  username: "username",
    //  password: "password",
    //  accountInfo {
    //      email: "example@gmail.com"
    //      phone: "0402987514"
    //  }
    //The role, username and password creates a new 'user'.
    //The accountInfo is used to create a data table associated with that new 'user' account
    //this way the accountInfo can be passed straight to the create function without
    //having to unpack it first.
    //This keeps the user information seperate and then there is just one User table
    //to query for signin.

    let roleName = req.body.role;

    if(roleName == null) {
        res.status(500).send({ message: "Role undefind" });
    }

    //Find the role the user is trying to sign up as
    Role.findOne({where: {name: roleName}})
    .then(role => { //create a user entry and return it for the next then function (account)
        return User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            RoleId: role.id
        })
    })
    .then(account => {
        let accountInfo = req.body.accountInfo;
        accountInfo.UserId = account.id;

        switch(roleName) {
            case "business": //create business table
                accountInfo.approved = false; //set the approval false by default (true for testing)
                Business.create(accountInfo).catch(err => {res.status(500).send({ message: err.message });});
                break;
    
            case "tracer": //create contact tracer table
                accountInfo.approved = false; //set the approval false by default (true for testing)
                Tracer.create(accountInfo).catch(err => {res.status(500).send({ message: err.message });});
                break;
    
            case "admin": //create admin table
                Admin.create(accountInfo).catch(err => {res.status(500).send({ message: err.message });});
                break;
    
            default: //create public table
                Public.create(accountInfo).catch(err => {res.status(500).send({ message: err.message });});
                break;
        }

        res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    //Variable to determine what datatable to query
    let datatable;

    //Get the data table associated with the account
    switch(req.body.role) {
        case "business":
            datatable = Business;
            break;

        case "tracer":
            datatable = Tracer;
            break;
            
        case "admin":
            datatable = Admin;
            break;

        default:
            datatable = Public;
            break;
    }

    //Query the selected database, joining the user table and the role table
    datatable.findOne({
        include: [{
            model: User,
            where: { username: req.body.username },
            include: [{
                model: Role,
                required: true
            }]
        }] 
    }).then(account => {
        if (!account) {
            return res.status(404).send({ message: "User Not found." });
        }

        //Check the approval of the account if it has a business or tracer role
        if((account.User.Role.name == "business" || account.User.Role.name == "tracer") && !account.approved) {
            return res.status(404).send({ message: "Account has not been approved yet." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            account.User.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({ id: account.User.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: account.User.id,
            username: account.User.username,
            email: account.email,
            role: "ROLE_" + account.User.Role.name.toUpperCase(),
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.terminalSignin = (req, res) => {
    let businessId;

    Business.findOne({
        where: { email: req.body.email },
        include: [{
            model: User,
            required: true,
            include: [{
                model: Role,
                required: true
            }]
        }] 
    })
    .then(business => {
        if (!business) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            business.User.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        };

        //set the id to be linked to the terminal for a foreign key
        businessId = business.id;
        //Find if there is a terminal in the database with that id
        return Terminal.findOne({where: { serialNumber: req.body.terminalId }});
    })
    .then(terminal => {
        //If no terminal exists - create a new entry
        if (!terminal) {
            Terminal.create({
                serialNumber: req.body.terminalId,
                location: req.body.location,
                BusinessId: businessId
            });
        } 
        //If a terminal exists - update the location (this will have to change later)
        else {
            Terminal.update({
                location: req.body.location
            },
            {
                where: {
                    serialNumber: req.body.terminalId
                }
            });
        }

        res.status(200).send({
            message: "Terminal Logged In.",
            terminalId: req.body.terminalId
        });
        
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};