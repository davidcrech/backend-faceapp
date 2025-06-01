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
      return res.status(404).json({
        status: "fail",
        message: "cannot find any document with that id",
      });

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
