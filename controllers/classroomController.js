const catchAsync = require("../utils/catchAsync");
const Classroom = require("../models/classroomModel");

exports.getClassroom = catchAsync(async (req, res, next) => {
  const data = await Classroom.find();

  return res.status(200).json({
    status: "success",
    data,
  });
});

exports.createClass = catchAsync(async (req, res, next) => {
  const data = await Classroom.create(req.body);

  return res.status(201).json({
    status: "success",
    data,
  });
});

exports.getOneClassroom = catchAsync(async (req, res, next) => {
  const data = await Classroom.findOne({ _id: req.params.classroomId });

  if (!data)
    return res.status(404).json({
      status: "fail",
      message: "cannot find any classroom with that id",
    });

  return res.status(200).json({
    status: "success",
    data,
  });
});
