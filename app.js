const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/Classrooms", classroomRouter);
app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Teachers", teacherRouter);
app.use("/api/auth", authRouter);

module.exports = app;
