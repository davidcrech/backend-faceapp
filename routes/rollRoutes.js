const express = require("express");
const rollController = require("../controllers/rollController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(rollController.getAllRolls)
  .post(rollController.createRoll)
  .delete(rollController.deleteAll);

router
  .route("/classroom-teacher")
  .get(rollController.getRollsByClassroomAndTeacher);

router
  .route("/:id")
  .get(rollController.getRoll)
  .patch(rollController.updateRoll)
  .delete(rollController.deleteRoll);

module.exports = router;
