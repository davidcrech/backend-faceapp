const express = require("express");
const classroomController = require("../controllers/classroomController");
const handleStudentUploads = require("../middlewares/uploadHandling");

const router = express.Router();

router
  .route("/")
  .get(classroomController.getClassroom)
  .post(classroomController.createClass)
  .delete(classroomController.deleteAllClasses);

router
  .route("/createWithImages")
  .post(handleStudentUploads, classroomController.createWithImages);

router
  .route("/byTeacher/:teacherId/")
  .get(classroomController.getClassroomsByTeacherId);

router
  .route("/:id")
  .get(classroomController.getOneClassroom)
  .patch(classroomController.updateClass)
  .delete(classroomController.deleteClass);

module.exports = router;
