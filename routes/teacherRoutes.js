const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(teacherController.createTeacher);

router.route("/:teacherId").get(teacherController.getTeacher);

module.exports = router;
