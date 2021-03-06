const db = require("../../models");
const User = db.User;
const Business = db.Business;

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({message: "Failed! Username is already in use!"});

            return;
        }

        next();
    });
};

//TODO THIS NEEDS TO BE RE-IMPLEMENTED TO ACCOUNT FOR THE PRIMARY USER TABLE AND THE SUB DATA TABLES
checkDuplicateEmail = (req, res, next) => {
    //Check User accounts
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({message: "Failed! Email is already in use!"});
            return;
        }

        //Check business accounts
        Business.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({message: "Failed! Email is already in use!"});
                return;
            }

            next();
        });
    });
}

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;