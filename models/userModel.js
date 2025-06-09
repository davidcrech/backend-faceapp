const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Um usuário tem que ter um nome!"],
  },
  classroom: {
    type: mongoose.Schema.ObjectId,
    ref: "Classroom",
  },
  image: {
    type: String,
    required: [true, "Um usuário tem que ter uma foto do rosto!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
