const AppError = require("./appError");
const catchAsync = require("./catchAsync");
const uploadToS3 = require("../utils/uploadToS3"); // Adjust the path
const User = require("../models/userModel");

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
    if (Model.modelName === "Classroom") {
      const { name, teacher, students } = req.body;

      const classroom = await Model.create({ name, teacher });

      const studentIds = await Promise.all(
        students.map(async (student) => {
          const imageUrl = await uploadToS3(student.image);

          const newUser = await User.create({
            name: student.name,
            image: imageUrl,
            classroom: classroom._id,
          });

          return newUser._id;
        })
      );

      classroom.students = studentIds;
      await classroom.save();

      return res.status(201).json({
        status: "success",
        data: classroom,
      });
    }

    const data = await Model.create(req.body);
    return res.status(201).json({
      status: "success",
      data,
    });
  });

exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany();

    res.status(204).json({
      status: "success",
      message: "Todos os documentos foram deletados com sucesso.",
      data: null,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data)
      return new AppError(404, "Nenhum documento encontrado com essa id!");

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
