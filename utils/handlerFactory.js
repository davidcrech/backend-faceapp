const AppError = require("./appError");
const catchAsync = require("./catchAsync");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();

    return res.status(200).json({
      status: "success",
      data,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);

    return res.status(201).json({
      status: "success",
      data,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data)
      return new AppError(404, "Cannot find any document with that ID!");

    return res.status(200).json({
      status: "success",
      data,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    return res.status(204).json({
      status: "success",
      data: null,
    });
  });
