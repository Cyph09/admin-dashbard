const mongoose = require("mongoose");
const User = mongoose.model("User");

// Display login page
exports.login = (req, res) => {
  res.render("login", { title: "Login" });
};

// Dispalay list of all users/home page
exports.index = (req, res) => {
  res.render("index", {
    title: "Admin Dashboard"
  });
};

// Display user profile
exports.userProfile = (req, rest) => {
  res.render("user-profile", { title: "User Profile" });
};

// Display Create new user form
exports.addUser = (req, res) => {
  res.render("edit-user", { title: "Add New User" });
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
