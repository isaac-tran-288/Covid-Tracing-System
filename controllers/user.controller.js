exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.memberBoard = (req, res) => {
    res.status(200).send("Member Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.businessBoard = (req, res) => {
    res.status(200).send("Business Content.");
};

exports.tracerBoard = (req, res) => {
    res.status(200).send("Contact Tracer Content.");
};