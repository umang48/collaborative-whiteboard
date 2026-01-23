# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### ❌ `npm install` fails

**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use yarn
yarn install
```

### ❌ Port already in use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3001`

**Solutions**:

Windows:
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
# Find and kill process
lsof -ti:3001 | xargs kill -9
```

Or change the port in `server.js`:
```javascript
const PORT = 3002; // Use different port
```

## Connection Issues

### ❌ WebSocket connection failed

**Problem**: Frontend can't connect to backend

**Check**:
1. Is the server running? (`npm run server`)
2. Is the URL correct in `App.jsx`?
3. Check browser console for errors

**Solutions**:

1. Verify server is running:
```bash
# Should see: "🚀 Socket.io server running on http://localhost:3001"
npm run server
```

2. Check `useMockSocket` in `App.jsx`:
```javascript
const useMockSocket = false; // Should be false for real-time
```

3. Verify Socket.io URL:
```javascript
socketRef.current = io('http://localhost:3001'); // Correct URL
```

### ❌ CORS errors

**Problem**: `Access-Control-Allow-Origin` error

**Solution**: Update CORS in `server.js`:
```javascript
cors: {
  origin: "http://localhost:5173", // Match your frontend URL
  methods: ["GET", "POST"]
}
```

## Drawing Issues

### ❌ Can't draw on canvas

**Problem**: Mouse events not working

**Check**:
1. Did you join the whiteboard?
2. Is a tool selected?
3. Check browser console for errors

**Solutions**:
1. Refresh the page
2. Clear browser cache
3. Try a different browser (Chrome recommended)

### ❌ Drawings not syncing

**Problem**: Other users don't see my drawings

**Check**:
1. Is the server running?
2. Are both users connected?
3. Check network tab in browser DevTools

**Solutions**:
1. Restart the server
2. Check Socket.io connection status
3. Verify `useMockSocket = false`

### ❌ Laggy drawing

**Problem**: Drawing feels slow or choppy

**Solutions**:
1. Close other browser tabs
2. Check CPU usage
3. Reduce canvas size
4. Optimize drawing code:
```javascript
// Add throttling to mouse events
const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
```

## UI Issues

### ❌ Toolbar not visible

**Problem**: Can't see the toolbar

**Solutions**:
1. Check browser zoom (should be 100%)
2. Resize browser window
3. Check CSS is loading:
```bash
# Verify App.css exists
ls src/App.css
```

### ❌ Buttons not working

**Problem**: Clicking buttons does nothing

**Solutions**:
1. Check browser console for errors
2. Verify React is loaded
3. Clear browser cache and refresh

### ❌ Responsive issues on mobile

**Problem**: UI broken on mobile devices

**Note**: Mobile support is basic. For better mobile experience:
1. Use landscape orientation
2. Zoom out if needed
3. Consider adding touch event handlers

## Server Issues

### ❌ Server crashes

**Problem**: Server stops unexpectedly

**Solutions**:

1. Check error logs
2. Add error handling:
```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
```

3. Use PM2 for auto-restart:
```bash
npm install -g pm2
pm2 start server.js
pm2 logs
```

### ❌ Memory leaks

**Problem**: Server memory usage keeps growing

**Solutions**:
1. Limit stored data
2. Add cleanup logic:
```javascript
// Clear old data periodically
setInterval(() => {
  // Clean up disconnected users
  users.forEach((user, id) => {
    if (!io.sockets.sockets.get(id)) {
      users.delete(id);
    }
  });
}, 60000); // Every minute
```

## Build Issues

### ❌ `npm run build` fails

**Problem**: Production build fails

**Solutions**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### ❌ Build size too large

**Problem**: Bundle size > 1MB

**Solutions**:
1. Check bundle analyzer:
```bash
npm install --save-dev rollup-plugin-visualizer
```

2. Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    react(),
    visualizer()
  ]
}
```

## Deployment Issues

### ❌ Deployed app not working

**Problem**: Works locally but not in production

**Check**:
1. Environment variables set correctly?
2. CORS configured for production URL?
3. HTTPS/WSS for secure connections?

**Solutions**:

1. Update Socket.io URL for production:
```javascript
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
socketRef.current = io(SOCKET_URL);
```

2. Update CORS in server:
```javascript
cors: {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"]
}
```

3. Use secure WebSocket (wss://):
```javascript
socketRef.current = io('https://your-server.com', {
  secure: true
});
```

## Browser-Specific Issues

### Chrome
- Usually works best
- Check for extensions blocking WebSockets

### Firefox
- May have stricter CORS policies
- Check about:config for WebSocket settings

### Safari
- May have issues with WebSocket connections
- Try enabling "Develop" menu → "Disable Cross-Origin Restrictions"

### Edge
- Similar to Chrome
- Usually works well

## Performance Issues

### ❌ High CPU usage

**Solutions**:
1. Reduce canvas size
2. Throttle mouse events
3. Optimize rendering:
```javascript
// Use React.memo for components
const Line = React.memo(({ points, stroke }) => (
  <Line points={points} stroke={stroke} />
));
```

### ❌ High memory usage

**Solutions**:
1. Limit number of drawings
2. Add cleanup:
```javascript
// Limit array size
if (lines.length > 1000) {
  setLines(lines.slice(-1000));
}
```

## Getting Help

### Still stuck?

1. **Check browser console**: Press F12 → Console tab
2. **Check network tab**: See if WebSocket connects
3. **Check server logs**: Look for error messages
4. **Try incognito mode**: Rules out extension issues
5. **Update dependencies**: `npm update`

### Debugging Tips

1. **Enable verbose logging**:
```javascript
// In App.jsx
console.log('Socket connected:', socketRef.current?.connected);
console.log('Drawing:', { tool, color, isDrawing });
```

2. **Check Socket.io connection**:
```javascript
socketRef.current.on('connect', () => {
  console.log('✅ Connected to server');
});

socketRef.current.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});
```

3. **Monitor events**:
```javascript
socketRef.current.onAny((event, ...args) => {
  console.log('Event:', event, args);
});
```

## Common Error Messages

### `Cannot read property 'emit' of null`
- Socket not initialized
- Check if user has joined

### `Failed to load resource: net::ERR_CONNECTION_REFUSED`
- Server not running
- Wrong URL

### `WebSocket connection failed`
- Server not accessible
- Firewall blocking connection

### `CORS policy: No 'Access-Control-Allow-Origin'`
- CORS not configured
- Update server.js CORS settings

## Quick Fixes Checklist

- [ ] Server is running (`npm run server`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Both on correct ports (3001 and 5173)
- [ ] `useMockSocket = false` in App.jsx
- [ ] Browser console shows no errors
- [ ] User has joined the whiteboard
- [ ] Tool is selected
- [ ] No firewall blocking connections

---

If none of these solutions work, please:
1. Check the GitHub issues
2. Create a new issue with:
   - Error message
   - Browser and OS
   - Steps to reproduce
   - Screenshots if possible

Happy debugging! 🐛
