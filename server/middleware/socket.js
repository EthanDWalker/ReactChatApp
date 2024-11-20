require("dotenv").config();
const { verify } = require("jsonwebtoken");

const socketMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("No token provided"));
  }
  try {
    const tokenData = verify(token, process.env.JWT_SECRET);
    socket.username = tokenData.username;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = socketMiddleware;
