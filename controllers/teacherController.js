const catchAsync = require("../utils/catchAsync");
const Teacher = require("../models/teacherModel");
const handlerFactory = require("../utils/handlerFactory");

exports.getAllTeachers = handlerFactory.getAll(Teacher);
exports.getTeacher = handlerFactory.getOne(Teacher);
exports.createTeacher = handlerFactory.createOne(Teacher);
exports.deleteAllTeachers = handlerFactory.deleteAllTeachers(Teacher);
exports.updateTeacher = handlerFactory.updateOne(Teacher);
exports.deleteTeacher = handlerFactory.deleteOne(Teacher);
