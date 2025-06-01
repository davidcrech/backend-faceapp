const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Classroom = require("../models/classroomModel");

exports.getClassroom = handlerFactory.getAll(Classroom);
exports.getOneClassroom = handlerFactory.getOne(Classroom);
exports.createClass = handlerFactory.createOne(Classroom);
exports.updateClass = handlerFactory.updateOne(Classroom);
