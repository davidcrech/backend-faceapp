const express = require("express");
const classroomController = require("../controllers/classroomController");

const router = new express.Router();

router
  .route("/")
  .get(classroomController.getClassroom)
  .post(classroomController.createClass);

router
  .route("/:id")
  .get(classroomController.getOneClassroom)
  .patch(classroomController.updateClass);

module.exports = router;
