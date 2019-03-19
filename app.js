const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const MONGODB_URI =
  "mongodb://mhina:mhina09@ds117164.mlab.com:17164/dashboard_1";

// Express app
const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Save up static files from public folder
app.use(express.static(path.join(__dirname, "public")));

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "hadha huwa",
    resave: false,
    saveUninitialized: true,
    store
  })
);

// Express Messages
app.use(flash());

// pass variables to templates + all requests
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  next();
});

// Use Routes
app.use("/", indexRouter);

module.exports = app;
