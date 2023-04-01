const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const PORT = process.env.SOCKETIO_PORT || 3500;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
});

io.on('connection', (socket: any) => {
  console.log('A user connected.');
  socket.on('join-board', (boardId: string) => {
    socket.join(boardId);
    console.log('client join board: ', boardId);
  });
});

server.listen(PORT, () =>
  console.log(`Socket.io server listening on PORT: ${PORT}`)
);
