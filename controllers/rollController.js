const Roll = require("../models/rollModel");
const catchAsync = require("../utils/catchAsync");

exports.createRoll = catchAsync(async (req, res, next) => {
  const newRoll = await Roll.create({
    classroom: req.body.classroom,
    teacher: req.body.teacher,
    date: req.body.date || Date.now(),
    students: req.body.students || [],
  });

  res.status(201).json({
    status: "success",
    data: {
      roll: newRoll,
    },
  });
});

exports.deleteAll = catchAsync(async (req, res, next) => {
  await Roll.deleteMany({});

  res.status(201).json({
    status: "success",
  });
});

exports.getRollsByClassroomAndTeacher = catchAsync(async (req, res, next) => {
  const { classroom, teacher } = req.query;

  if (!classroom || !teacher) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide both classroom and teacher in query parameters.",
    });
  }

  const rolls = await Roll.find({ classroom, teacher });

  res.status(200).json({
    status: "success",
    results: rolls.length,
    data: {
      rolls,
    },
  });
});

exports.getAllRolls = catchAsync(async (req, res, next) => {
  const rolls = await Roll.find();

  res.status(200).json({
    status: "success",
    results: rolls.length,
    data: {
      rolls,
    },
  });
});

exports.getRoll = catchAsync(async (req, res, next) => {
  const roll = await Roll.findById(req.params.id);

  if (!roll) {
    return next(new Error("No roll found with that ID"));
  }

  res.status(200).json({
    status: "success",
    data: {
      roll,
    },
  });
});

exports.updateRoll = catchAsync(async (req, res, next) => {
  const roll = await Roll.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!roll) {
    return next(new Error("No roll found with that ID"));
  }

  res.status(200).json({
    status: "success",
    data: {
      roll,
    },
  });
});

exports.deleteRoll = catchAsync(async (req, res, next) => {
  const roll = await Roll.findByIdAndDelete(req.params.id);

  if (!roll) {
    return next(new Error("No roll found with that ID"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
