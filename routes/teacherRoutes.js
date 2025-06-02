const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .delete(teacherController.deleteTeacher);

module.exports = router;
