const catchAsync = require("../utils/catchAsync");
const Teacher = require("../models/teacherModel");

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const data = await Teacher.find();

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const data = await Teacher.findById(req.params.teacherId);

  if (!data)
    return res.status(404).json({
      status: "fail",
      message: "cannot find required teacher",
    });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.createTeacher = catchAsync(async (req, res, next) => {
  const data = await Teacher.create(req.body);

  res.status(201).json({
    status: "success",
    data,
  });
});
