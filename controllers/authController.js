const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_OAUTH);

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let teacher = await Teacher.findOne({ googleId: payload.sub });

    if (!teacher) {
      teacher = await Teacher.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
      });
    }

    const token = jwt.sign({ userId: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { name: payload.name, email: payload.email,id: teacher._id } });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token inválido" });
  }
};

exports.validateToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ valid: false });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded.userId);
    if (!teacher)
      return res
        .status(404)
        .json({ valid: false, error: "Usuário não encontrado" });

    res.json({
      valid: true,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
      },
    });
  } catch (err) {
    console.error("Erro ao validar token:", err);
    res.status(401).json({ valid: false });
  }
};
