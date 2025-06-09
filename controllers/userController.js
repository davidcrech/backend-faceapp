const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const handlerFactory = require("../utils/handlerFactory");

exports.getUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User);
exports.createUser = handlerFactory.createOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
