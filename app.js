const express = require("express");
const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/Classrooms", classroomRouter);
app.use("/api/v1/Users", userRouter);

module.exports = app;
