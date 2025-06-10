const AppError = require("../utils/appError");

exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`❌ [${statusCode}] ${message}`);

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

exports.notFound = (req, res, next) => {
  res.status(404);
  next(new AppError(`Rota não encontrada: ${req.originalUrl}`, 404));
};
