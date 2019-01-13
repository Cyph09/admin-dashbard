// Import modules
const mongoose = require("mongoose");

// Import environmental variables

// Connect to database and handle bad connections
const dbUri = "mongodb://mhina:mhina09@ds117164.mlab.com:17164/dashboard_1";
mongoose.connect(
  dbUri,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // Tell mongoose to use ES6 Promises
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// Import all models
require("./models/User");

// Start app
const app = require("./app");
app.set("port", process.env.PORT || 3300);
const server = app.listen(app.get("port"), () => {
  console.log(`App running on PORT ${server.address().port}`);
});
