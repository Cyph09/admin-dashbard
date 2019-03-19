const mongoose = require("mongoose");
const User = mongoose.model("User");
const { validationResult } = require("express-validator/check");

// Display login page
exports.getSignin = (req, res, next) => {
  console.log("signin page");
  console.log(req.session.isLoggedin);
  res.render("signin", { title: "Sigin" });
};

// Post login
exports.postSignin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).render("signin", {
        title: "Signin",
        errorMessages: errors.array()
      });
    }
    const user = await User.findOne({ email: email, password: password });
    if (email === user.email && password === user.password) {
      req.session.isLoggedin = true;
      res.redirect("/dashboard");
      return next();
    } else {
      res.redirect("/");
      console.log("Wrong credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

// Post signout
exports.signout = (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
    console.log(err);
  });
};

// Dispalay list of all users/home page
exports.index = async (req, res) => {
  try {
    // Query database for all users
    const users = await User.find();
    res.render("index", {
      title: "Dashboard",
      users
    });
  } catch (error) {
    console.log(error);
  }
};

// Display user profile
exports.userProfile = async (req, res, next) => {
  try {
    // Find user by id and render profile
    const user = await User.findOne({ _id: req.params.id });
    res.render("user-profile", { title: "User Profile", user });
  } catch (error) {
    console.log(error);
  }
};

// Display Create new user form
exports.addUser = (req, res) => {
  res.render("edit-user", { title: "Add New User" });
};

// Create new user
exports.createUser = async (req, res) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  };
  const user = new User(req.body);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).render("edit-user", {
      // path: "/add",
      title: "Add New User",
      errorMessages: errors.array()
    });
  }
  try {
    await user.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Edit user
exports.editUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.render("edit-user", { title: `Edit ${user.firstName}`, user });
  } catch (error) {
    console.log(error);
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.body.userId });
    console.log(`Deleted ${user.name}`);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
