const express = require("express");
const userController = require("../controllers/userController");

const router = new express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);
router.route("/:userId").get(userController.getOneUser);

module.exports = router;
