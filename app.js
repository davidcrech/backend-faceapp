const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const rollRouter = require("./routes/rollRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://master.d3luxg79ga6mfb.amplifyapp.com",
  "https://master.d3luxg79ga6mfb.amplifyapp.com/",
  "http://master.d3luxg79ga6mfb.amplifyapp.com/",
  "https://master.d3luxg79ga6mfb.amplifyapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1/Classrooms", classroomRouter);
app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Teachers", teacherRouter);
app.use("/api/v1/Rolls", rollRouter);
app.use("/api/auth", authRouter);

module.exports = app;
