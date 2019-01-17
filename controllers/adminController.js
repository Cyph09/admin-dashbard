const mongoose = require("mongoose");
const User = mongoose.model("User");
// Display login page
exports.login = (req, res) => {
  res.render("login", { title: "Login" });
};

// Dispalay list of all users/home page
exports.index = async (req, res) => {
  try {
    // Query database for all users
    const users = await User.find();
    res.render("index", {
      title: "Admin Dashboard",
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
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/");
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
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    console.log(`Deleted ${user.name}`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
