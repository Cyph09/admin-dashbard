const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

// Express app
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Save up static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Use Routes
app.use("/", indexRouter);

module.exports = app;
