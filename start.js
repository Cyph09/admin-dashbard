// Import modules
const mongoose = require("mongoose");

// Import environmental variables

// Connect to database and handle bad connections
const dbUrl = "mongodb://mhina:mhina09@ds117164.mlab.com:17164/dashboard_1";

// Import all models

// Start app
const app = require("./app");
app.set("port", process.env.PORT || 3300);
const server = app.listen(app.get("port"), () => {
  console.log(`App running on PORT ${server.address().port}`);
});
