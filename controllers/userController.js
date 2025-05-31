const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.getUsers = catchAsync(async (req, res, next) => {
  const data = await User.find();

  return res.status(200).json({
    status: "success",
    data,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const data = await User.create(req.body);

  return res.status(201).json({
    status: "success",
    data,
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.params.userId);

  if (!data)
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });

  return res.status(200).json({
    status: "success",
    data,
  });
});
