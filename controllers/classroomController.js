const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Classroom = require("../models/classroomModel");

exports.getClassroom = handlerFactory.getAll(Classroom);
exports.getClassroomsByTeacherId = handlerFactory.getClassroomsByTeacherId(Classroom);
exports.createWithImages = handlerFactory.createWithImages(Classroom);
exports.getOneClassroom = handlerFactory.getOne(Classroom);
exports.createClass = handlerFactory.createOne(Classroom);
exports.deleteAllClasses = handlerFactory.deleteAllClasses(Classroom);
exports.updateClass = handlerFactory.updateOne(Classroom);
exports.deleteClass = handlerFactory.deleteOne(Classroom);
