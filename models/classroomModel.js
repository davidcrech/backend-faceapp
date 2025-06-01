const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A turma precisa ter um nome!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: "Teacher",
    required: [true, "A turma precisa ter um professor!"],
    max: 1,
  },
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A turma precisa ter alunos!"],
    },
  ],
});

classroomSchema.pre(/^find/, function (next) {
  this.populate({
    path: "teacher",
  });
  next();
});

classroomSchema.pre(/^find/, function (next) {
  this.populate({
    path: "students",
    select: "-__v -classroom -createdAt",
  });
  next();
});

module.exports = mongoose.model("Classroom", classroomSchema);
