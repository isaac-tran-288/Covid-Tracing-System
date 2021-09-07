const db = require("../models/index.js");
const config = require("../config/auth.config");
const User = db.User;
const Business = db.Business;
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
        name: req.body.name,
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
            name: req.body.name
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
                name: user.name,
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
            name: req.body.name,
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
            name: business.name,
            email: business.email,
            role: "ROLE_BUSINESS", //we know it is a business account at this point
            accessToken: token
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};