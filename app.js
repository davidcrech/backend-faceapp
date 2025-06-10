const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandling = require("./middlewares/errorHandling");

dotenv.config();

const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const rollRouter = require("./routes/rollRoutes");
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
app.use("/api/v1/Rolls", rollRouter);
app.use("/api/auth", authRouter);

app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler);

module.exports = app;
