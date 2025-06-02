const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Um professor precisa ter um nome!"],
  },
  classroom: {
    type: mongoose.Schema.ObjectId,
    ref: "Classroom",
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
