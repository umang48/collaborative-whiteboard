import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);

// Configure Socket.io with proper CORS for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://collab-whiteboard.phptutorialpoints.in'
];

const io = new Server(httpServer, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
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

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on port ${PORT}`);
  console.log(`📡 Allowed origins:`, allowedOrigins);
});
