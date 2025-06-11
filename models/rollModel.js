const mongoose = require("mongoose");

const rollSchema = new mongoose.Schema({
  classroom: {
    type: mongoose.Schema.ObjectId,
    ref: "Classroom",
    required: [true, "A presença precisa estar vinculada a uma turma!"],
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
    required: [true, "A presença precisa estar vinculada a um professor!"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "A presença precisa de uma data!"],
  },
  students: [
    {
      student: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A student ID is required!"],
      },
      status: {
        type: String,
        enum: ["present", "absent", "late"],
        default: "absent",
      },
    },
  ],
});

rollSchema.pre(/^find/, function (next) {
  this.populate({
    path: "students.student",
    select: "-__v -createdAt -classroom",
  })
    .populate({
      path: "classroom",
      select: "-__v -createdAt",
    })
    .populate({
      path: "teacher",
      select: "-__v -googleId",
    });
  next();
});

module.exports = mongoose.model("Roll", rollSchema);
