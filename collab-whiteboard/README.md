# 🎨 Collaborative Whiteboard - Real-Time Drawing App

A modern, futuristic collaborative whiteboard application built with React, Konva.js, and Socket.io. Multiple users can draw, add shapes, and place sticky notes in real-time with live cursor tracking.

## ✨ Features

### Core Functionality
- **Real-Time Collaboration**: See other users' drawings instantly as they create them
- **Live Cursor Tracking**: View other users' mouse cursors with their names (like Google Docs)
- **Multiple Drawing Tools**:
  - ✏️ Pen - Freehand drawing
  - ▭ Rectangle - Draw rectangles
  - 📝 Sticky Notes - Add draggable notes
  - 🧹 Eraser - Remove elements
- **Color Picker**: Choose any color for your drawings
- **User Presence**: See who's online in real-time
- **Modern UI**: Futuristic gradient design with smooth animations

### Technical Highlights
- WebSocket-based real-time synchronization
- Canvas API with Konva.js for smooth rendering
- Responsive design for all screen sizes
- Clean, maintainable React code

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 2 minutes
- **[FEATURES.md](FEATURES.md)** - Detailed feature showcase
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Architecture and technical details
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd collab-whiteboard
```

2. Dependencies are already installed, but if needed:
```bash
npm install
```

### Running the Application

You need to run TWO terminals:

#### Terminal 1 - Start the Socket.io Server
```bash
npm run server
```
This starts the WebSocket server on `http://localhost:3001`

#### Terminal 2 - Start the React App
```bash
npm run dev
```
This starts the frontend on `http://localhost:5173`

### Testing Collaboration

1. Open `http://localhost:5173` in your browser
2. Enter your name and join
3. Open the same URL in another browser window or incognito tab
4. Enter a different name
5. Start drawing in one window and watch it appear in the other!

## 🛠️ Tech Stack

- **Frontend**: React 19, Konva.js, React-Konva
- **Real-Time**: Socket.io (client & server)
- **Styling**: Modern CSS with gradients and animations
- **Build Tool**: Vite
- **Backend**: Node.js, Express

## 📁 Project Structure

```
collab-whiteboard/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styling
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── server.js            # Socket.io server
├── package.json         # Dependencies
└── README.md           # This file
```

## 🎯 How It Works

### Real-Time Synchronization
1. Users connect to the Socket.io server
2. Drawing actions emit events to the server
3. Server broadcasts events to all connected clients
4. Clients update their canvas in real-time

### Key Components
- **Stage & Layer**: Konva.js canvas management
- **Socket.io**: WebSocket communication
- **State Management**: React hooks for local state
- **Event Handlers**: Mouse events for drawing

## 🔧 Configuration

### Switching Between Mock and Real Socket

In `src/App.jsx`, line 10:
```javascript
const useMockSocket = true;  // Change to false for real Socket.io
```

- `true`: Demo mode (no server needed)
- `false`: Real-time mode (requires server running)

### Server Configuration

In `server.js`, modify the port or CORS settings:
```javascript
const PORT = 3001;  // Change port if needed

cors: {
  origin: "http://localhost:5173",  // Update if frontend port changes
  methods: ["GET", "POST"]
}
```

## 🎨 Usage Guide

1. **Join**: Enter your name to join the whiteboard
2. **Select Tool**: Click toolbar buttons to switch tools
3. **Draw**: Click and drag on the canvas
4. **Change Color**: Use the color picker
5. **Clear**: Remove all drawings with the Clear button
6. **Collaborate**: Open multiple windows to see real-time updates

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```
Deploy the `dist` folder

### Backend (Heroku/Railway/Render)
Deploy `server.js` with Node.js runtime

Update the Socket.io connection URL in `App.jsx`:
```javascript
socketRef.current = io('https://your-server-url.com');
```

## 🔮 Future Enhancements

- [ ] Text tool for adding custom text
- [ ] Undo/Redo functionality
- [ ] Save/Load whiteboard state
- [ ] Export as image (PNG/SVG)
- [ ] Room system for private whiteboards
- [ ] Authentication with user accounts
- [ ] Drawing permissions (view-only mode)
- [ ] Mobile touch support optimization
- [ ] Voice chat integration
- [ ] AI-powered shape recognition

## 🐛 Troubleshooting

### Server won't start
- Check if port 3001 is available
- Ensure all dependencies are installed: `npm install`

### Real-time not working
- Verify server is running (`npm run server`)
- Check browser console for connection errors
- Ensure `useMockSocket` is set to `false`

### Canvas not responsive
- Refresh the page
- Check browser compatibility (Chrome/Firefox recommended)

## 📝 License

MIT License - Feel free to use this project for learning and portfolio purposes!

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

## 🌟 Why This Project?

This project demonstrates:
- **WebSocket mastery**: Real-time bidirectional communication
- **Complex state management**: Synchronizing state across multiple clients
- **Canvas manipulation**: Advanced drawing with Konva.js
- **Modern React patterns**: Hooks, refs, and event handling
- **Full-stack skills**: Frontend + Backend integration

Perfect for showcasing in interviews for companies building collaborative tools like Figma, Miro, Slack, or Discord!

---

Built with ❤️ using React, Socket.io, and Konva.js
