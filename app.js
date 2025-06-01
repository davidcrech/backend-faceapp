const express = require("express");
const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/Classrooms", classroomRouter);
app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Teachers", teacherRouter);

module.exports = app;
