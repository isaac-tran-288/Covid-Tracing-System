const db = require("../models/index.js");
const config = require("../config/auth.config");
const User = db.User;
const Business = db.Business;
const Terminal = db.Terminal;
const Role = db.Role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//User signup and sign in functionality
exports.signup = (req, res) => {
    //Default user role (public)
    let roleId = 1;

    //Find the role is another is supplied
    if (req.body.role) {
        Role.findOne({
            where: {
                name: req.body.role
            }
        }).then(role => {
            roleId = role.id;
        });
    }

    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        RoleId: roleId
    }).then(() => {
        res.send({ message: "User was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        //Connect the role with the user
        Role.findOne({
            where: {
                id: user.RoleId
            }
        }).then(role => {
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                role: "ROLE_" + role.name.toUpperCase(),
                accessToken: token
            });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

//User signup and sign in functionality
exports.businessSignup = (req, res) => {
    //Find the business role (incase more are added later and id isn't the same)
    Role.findOne({
        where: {
            name: "business"
        }
    }).then(role => {
        // Save Business to Database
        Business.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            RoleId: role.id //assign the new role id
        }).then(() => {
            res.send({ message: "User was registered successfully!" });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.businessSignin = (req, res) => {
    Business.findOne({
        where: {
            email: req.body.email
        }
    }).then(business => {
        if (!business) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            business.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({ id: business.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: business.id,
            username: business.username,
            email: business.email,
            role: "ROLE_BUSINESS", //we know it is a business account at this point
            accessToken: token
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.terminalSignin = (req, res) => {
    let businessId;

    //Check that the business account is valid - might not need this
    Business.findOne({
        where: {
            email: req.body.email
        }
    }).then(business => {
        if (!business) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            business.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        };

        //set the id to be linked to the terminal for a foreign key
        businessId = business.id;
    }).then(() => {
        //Find if there is a terminal in the database with that id
        Terminal.findOne({
            where: {
                serialNumber: req.body.tabletId
            }
        }).then(terminal => {
            //If no terminal exists - create a new entry
            if (!terminal) {
                Terminal.create({
                    serialNumber: req.body.tabletId,
                    location: req.body.location,
                    BusinessId: businessId
                });
            } 
            //If a terminal exists - update the location (this will have to change later)
            else {
                Terminal.update({
                    location: location
                },
                {
                    where: {
                        serialNumber: req.body.tabletId
                    }
                });
            }

            res.status(200).send({ message: "Terminal Logged In." });
            
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    });
};