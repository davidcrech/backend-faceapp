const express = require("express");
const classroomController = require("../controllers/classroomController");

const router = new express.Router();

router.route("/").get(classroomController.getClassroom);
router.route("/CreateOne").post(classroomController.createClass);
router.route("/:id").get(classroomController.getOneClassroom);

module.exports = router;
