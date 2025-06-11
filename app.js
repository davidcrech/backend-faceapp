// Imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routers
const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const rollRouter = require("./routes/rollRoutes");
const authRouter = require("./routes/authRoutes");

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Allowed origins (no trailing slashes!)
const allowedOrigins = [
  "http://localhost:3000",
  "https://master.d3luxg79ga6mfb.amplifyapp.com",
  "https://master.d3luxg79ga6mfb.amplifyapp.com/",
  "http://master.d3luxg79ga6mfb.amplifyapp.com/",
  "https://master.d3luxg79ga6mfb.amplifyapp.com",
];

// CORS configuration
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


// Routes
app.use("/api/v1/Classrooms", classroomRouter);
app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Teachers", teacherRouter);
app.use("/api/v1/Rolls", rollRouter);
app.use("/api/auth", authRouter);

module.exports = app;
