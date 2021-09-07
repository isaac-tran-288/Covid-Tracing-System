// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

// Dependencies
// =============================================================
const express = require("express");
const compression = require("compression");
const path = require("path");

// Sets up the Express app
// =============================================================
const PORT = process.env.PORT || 3001;
const app = express();

// Requiring our models for syncing
// =============================================================
const db = require("./models");

// Using compression npm to improve performance
app.use(compression());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
app.use(express.static("client/build"));

// API Routes
// =============================================================
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Sync our models (db) with the attached database
// Start the server on the specified port
// =============================================================
db.sequelize.sync().then(() => {
    // initiateRoles();

    app.listen(PORT, () => { 
        console.log("app listening on http://localhost:" + PORT);
    });
});

// Create the different roles for the web application (only do once)
// =============================================================

const ROLES = ["member", "admin", "business", "tracer"]; //TODO put into schema later

initiateRoles = () => {
    let roleId = 1;

    ROLES.forEach(role => {
        db.Role.create({
            id: roleId,
            name: role
        });

        roleId++;
    });
}
