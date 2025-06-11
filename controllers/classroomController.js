const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Classroom = require("../models/classroomModel");

exports.getClassroomsByTeacherId = exports.getClassroomsByTeacherId = (Model) =>
  catchAsync(async (req, res, next) => {
    const teacherId = req.params.teacherId;

    if (!teacherId) {
      return res.status(400).json({
        status: "fail",
        message: "Teacher ID is required",
      });
    }

    const data = await Model.find({ teacher: teacherId });

    return res.status(200).json({
      status: "success",
      data,
    });
  });

exports.createWithImages = exports.createWithImages = (Model) =>
  catchAsync(async (req, res, next) => {
    const {
      teacherId,
      className,
      students: studentData,
    } = req.parsedData || {};

    if (!teacherId || !className) {
      return next(
        new AppError("Both teacher ID and class name are required", 400)
      );
    }

    const classroom = await Model.create({
      name: className,
      teacher: teacherId,
      students: [],
    });

    const studentCreationPromises = studentData.map(async (student, index) => {
      if (!student?.name) {
        throw new AppError(`Student ${index + 1} is missing a name`, 400);
      }

      if (!student?.imageFile) {
        throw new AppError(`Student ${index + 1} is missing an image`, 400);
      }

      const imageUrl = await uploadToS3(
        student.imageFile.buffer,
        student.imageFile.mimetype
      );

      const createdUser = await User.create({
        name: student.name,
        image: imageUrl,
      });

      return createdUser;
    });

    const createdStudents = await Promise.all(studentCreationPromises);

    classroom.students = createdStudents.map((s) => s._id);
    await classroom.save();

    const populatedClassroom = await Model.findById(classroom._id)
      .populate("teacher")
      .populate("students");

    res.status(201).json({
      status: "success",
      data: {
        classroom: populatedClassroom,
      },
    });
  });

exports.createClass = handlerFactory.createOne(Classroom);
exports.getClassroom = handlerFactory.getAll(Classroom);
exports.getOneClassroom = handlerFactory.getOne(Classroom);
exports.updateClass = handlerFactory.updateOne(Classroom);
exports.deleteClass = handlerFactory.deleteOne(Classroom);
exports.deleteAllClasses = handlerFactory.deleteAll(Classroom);
