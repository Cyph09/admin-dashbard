const express = require("express");
const router = express.Router();

// Require controller modules
const adminController = require("../controllers/adminController");

// GET homepage (Display list of users)
router.get("/", adminController.index);

// GET /usreId:user-profile
router.get("/user-profile", adminController.userProfile);

// GET /:userId/edit-user
router.get("/edit-user", adminController.addUser);

// GET /add
router.get("/add", adminController.addUser);

//POST /add-user
router.post("/add", adminController.createUser);

// PUT /:userId/edit-user

// POST /:userId/delete-user

module.exports = router;
