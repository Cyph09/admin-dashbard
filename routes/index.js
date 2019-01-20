const express = require("express");
const router = express.Router();

// Require controller modules
const adminController = require("../controllers/adminController");
const errorController = require("../controllers/errorController");

// GET sigin page
router.get("/", adminController.getSignin);

// POST sigin page
router.post("/signin", adminController.postSignin);

// GET homepage (Display list of users)
router.get("/dashboard", adminController.index);

// GET /add user form
router.get("/add", adminController.addUser);

//POST /add-user
router.post("/add", adminController.createUser);
// POST /update user/:id
router.post("/add/:id", adminController.updateUser);

// GET /:usreId/user-profile
router.get("/users/user-profile/:id", adminController.userProfile);

// GET users/:userId/edit-user
router.get("/users/edit-user/:id", adminController.editUser);

// POST /:userId/delete-user
router.post("/delete/", adminController.deleteUser);

// GET /404
router.get("*", errorController.get404);

module.exports = router;
