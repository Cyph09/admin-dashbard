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
exports.userProfile = (req, res) => {
  res.render("user-profile", { title: "User Profile" });
};

// Display Create new user form
exports.addUserForm = (req, res) => {
  res.render("edit-user", { title: "Add New User" });
};
