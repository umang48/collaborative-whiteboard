# 🚀 Quick Start Guide

Get your collaborative whiteboard running in 2 minutes!

## Step 1: Start the Server

Open a terminal and run:
```bash
cd collab-whiteboard
npm run server
```

You should see:
```
🚀 Socket.io server running on http://localhost:3001
```

## Step 2: Start the Frontend

Open a NEW terminal and run:
```bash
cd collab-whiteboard
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Step 3: Test It Out

1. Open `http://localhost:5173` in your browser
2. Enter your name (e.g., "Alice")
3. Click "Join Whiteboard"
4. Start drawing!

## Step 4: Test Real-Time Collaboration

1. Open `http://localhost:5173` in a NEW browser window (or incognito)
2. Enter a different name (e.g., "Bob")
3. Draw in one window
4. Watch it appear instantly in the other window! 🎉

## Tips

- **Switch Tools**: Click the toolbar buttons (Pen, Rectangle, Sticky, Eraser)
- **Change Colors**: Use the color picker
- **Clear Canvas**: Click the 🗑️ Clear button
- **See Cursors**: Move your mouse to see other users' cursors

## Demo Mode (No Server Needed)

If you just want to test the UI without real-time features:

1. In `src/App.jsx`, keep `useMockSocket = true`
2. Only run: `npm run dev`
3. You can draw, but won't see real-time updates

## Troubleshooting

**Port already in use?**
- Kill the process using port 3001 or 5173
- Or change the port in `server.js` or `vite.config.js`

**Connection failed?**
- Make sure BOTH server and frontend are running
- Check `useMockSocket` is set to `false` in `App.jsx`

---

That's it! You're ready to collaborate! 🎨
