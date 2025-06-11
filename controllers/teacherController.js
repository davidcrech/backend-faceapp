const catchAsync = require("../utils/catchAsync");
const Teacher = require("../models/teacherModel");
const handlerFactory = require("../utils/handlerFactory");

exports.createTeacher = handlerFactory.createOne(Teacher);
exports.getAllTeachers = handlerFactory.getAll(Teacher);
exports.getTeacher = handlerFactory.getOne(Teacher);
exports.updateTeacher = handlerFactory.updateOne(Teacher);
exports.deleteTeacher = handlerFactory.deleteOne(Teacher);
exports.deleteAllTeachers = handlerFactory.deleteAll(Teacher);
