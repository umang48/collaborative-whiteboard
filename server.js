import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const users = new Map();
const canvasState = {
  shapes: []
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (data) => {
    users.set(socket.id, { username: data.username, id: socket.id });
    
    // Send current canvas state to new user
    socket.emit('initial-state', canvasState);
    
    // Broadcast updated user list to all clients
    io.emit('users', Array.from(users.values()));
    console.log(`${data.username} joined. Total users: ${users.size}`);
  });

  socket.on('draw', (data) => {
    // Store the shape in server state
    canvasState.shapes.push(data.shape);
    
    // Broadcast to all other clients
    socket.broadcast.emit('draw', data);
  });

  socket.on('cursor-move', (data) => {
    socket.broadcast.emit('cursor-move', { ...data, userId: socket.id });
  });

  socket.on('clear-canvas', () => {
    canvasState.shapes = [];
    io.emit('clear-canvas');
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    users.delete(socket.id);
    io.emit('users', Array.from(users.values()));
    console.log(`${user?.username || 'User'} disconnected. Total users: ${users.size}`);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on http://localhost:${PORT}`);
});
