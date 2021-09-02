// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const compression = require("compression");
const path = require("path");

// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 3001;
const app = express();

// Using compression npm to improve performance
app.use(compression());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
app.use(express.static("client/build"));

// API Routes
// =============================================================
require("./routes/api_routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Start the server on the specified port
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});
