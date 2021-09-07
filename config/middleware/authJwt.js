const jwt = require("jsonwebtoken");
const config = require("../auth.config.js");
const db = require("../../models");
const User = db.user;
const Business = db.Business;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        db.Role.findByPk(user.RoleId).then(result => {
            if (result.name === "admin") {
                next();
                return;
            }
    
            res.status(403).send({
                message: "Require Admin Role!"
            });
        });
    });
};

isBusiness = (req, res, next) => {
    Business.findByPk(req.userId).then(business => {
        db.Role.findByPk(business.RoleId).then(result => {
            if (result.name === "business") {
                next();
                return;
            }
    
            res.status(403).send({
                message: "Require Business Role!"
            });
        });
    });
};

isTracer = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        db.Role.findByPk(user.RoleId).then(result => {
            if (result.name === "tracer") {
                next();
                return;
            }
    
            res.status(403).send({
                message: "Require Contact Tracer Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isBusiness: isBusiness,
    isTracer: isTracer
};

module.exports = authJwt;