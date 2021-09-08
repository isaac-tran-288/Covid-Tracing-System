const db = require("../../models");
const User = db.User;
const Business = db.Business;

// GOING TO NEED MODIFICATION TO HANDLE DIFFERENT USER TYPES

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