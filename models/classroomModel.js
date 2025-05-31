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
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A turma precisa ter alunos!"],
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);
