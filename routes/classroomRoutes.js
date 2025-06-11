const express = require("express");
const classroomController = require("../controllers/classroomController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

const handleStudentUploads = (req, res, next) => {
  const fields = [];

  for (let i = 0; i < 50; i++) {
    fields.push({ name: `students[${i}][image]`, maxCount: 1 });
  }

  fields.push({ name: "teacherId", maxCount: 1 });
  fields.push({ name: "className", maxCount: 1 });

  upload.fields(fields)(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    try {
      const { teacherId, className, students } = req.body;
      console.log("req.body");
      console.log(req.body);
      if (!teacherId || !className || !students) {
        return res.status(400).json({
          status: "fail",
          message: "Missing teacherId, className or students",
        });
      }

      const studentArray = Array.isArray(students) ? students : [students];

      const parsedStudents = [];

      for (let i = 0; i < studentArray.length; i++) {
        const student = studentArray[i];

        if (!student.name) {
          return res.status(400).json({
            status: "fail",
            message: `Missing name for student at index ${i}`,
          });
        }

        const imageField = `students[${i}][image]`;
        const imageFile = req.files?.[imageField]?.[0];

        if (!imageFile) {
          return res.status(400).json({
            status: "fail",
            message: `Missing image for student at index ${i}`,
          });
        }

        parsedStudents.push({
          name: student.name,
          imageFile: imageFile,
        });
      }

      if (parsedStudents.length === 0) {
        return res.status(400).json({
          status: "fail",
          message: "No valid students provided",
        });
      }

      console.log("INFO");
      req.parsedData = {
        teacherId,
        className,
        students: parsedStudents,
      };

      next();
    } catch (error) {
      console.error("Error parsing form data:", error);
      return res.status(500).json({
        status: "error",
        message: "Error processing form data",
      });
    }
  });
};

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
