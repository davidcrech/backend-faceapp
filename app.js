const express = require("express");
const classroomRouter = require("./routes/classroomRoutes");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const Teacher = require("./models/teacherModel");
const User = require("./models/userModel");
const cors = require("cors")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_OAUTH);
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // se estiver usando cookies ou tokens com credenciais
  }));
app.use("/api/v1/Classrooms", classroomRouter);
app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Teachers", teacherRouter);
app.post('/api/auth/google', async (req, res) => {
    const { idToken } = req.body;
  
    try {
      // Verifica token no Google
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      console.log(payload)
      console.log("PAYLOAD\n")
      let teacher = await Teacher.findOne({ googleId: payload.sub });
      if (!teacher) {
        teacher = await Teacher.create({
          googleId: payload.sub,
          name: payload.name,
          email: payload.email,
        });
      }
  
      const token = jwt.sign({ userId: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // expira em 1 dia
  
      res.json({ token, user: { name: payload.name, email: payload.email } });
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Token inválido' });
    }
  });

  app.post('/api/auth/validate-token', async (req, res) => {
    console.log("validando token...\n\n");
    const authHeader = req.headers.authorization;
  
    if (!authHeader) return res.status(401).json({ valid: false });
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const teacher = await Teacher.findById(decoded.userId);
  
      if (!teacher) {
        return res.status(404).json({ valid: false, error: 'Usuário não encontrado' });
      }
  
      res.json({
        valid: true,
        user: {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
        },
      });
    } catch (err) {
      console.error('Erro ao validar token:', err);
      res.status(401).json({ valid: false });
    }
  });
  

module.exports = app;
