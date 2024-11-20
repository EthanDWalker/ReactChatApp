require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const socketMiddleware = require("./middleware/socket");
const authRoute = require("./routes/auth");

const connectDB = require("./db/connect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/auth", authRoute);

const server = http.createServer(app);

const PORT = 3000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.username} ${Math.random()}`);
  socket.on("msg", (msg, room) => {
    msg.author = socket.username;
    console.log(msg);
    socket.to(room).emit("msg", msg);
  });
  socket.on("join-room", async (room) => {
    await socket.join(room);
  });
});

io.use(socketMiddleware);

const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {}
};

start();
