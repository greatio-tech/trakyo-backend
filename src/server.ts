// import app from './app';
// import http from 'http';
// import { Server } from 'socket.io';

// const PORT = process.env.PORT || 5000;

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// app.set('io', io);

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;

const app = express();
// const server = http.createServer(app);
const ws = require("ws");
const server = require("http").createServer(app);
const wss = new ws.server({ server });
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const connectedUsers: { [key: string]: string } = {}; // Track connected users

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("register", (userId: string) => {
    console.log(`User registered: ${userId}`);
    connectedUsers[userId] = socket.id;
  });

  socket.on("notification", (data: { userId: string; message: string }) => {
    const { userId, message } = data;
    const socketId = connectedUsers[userId];
    if (socketId) {
      io.to(socketId).emit("notification", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

wss.on("connection", (ws: any) => {
  ws.on("message", (message: any) => {
    wss.clients.forEach((client: any) => {
      client.send(message);
    });
  });
});

app.set("io", io);
app.set("connectedUsers", connectedUsers);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
