# Common Errors & Solutions

## 🔴 Socket.io Connection Errors

### Error: `GET http://localhost:3001/socket.io/?EIO=4&transport=polling&t=... net::ERR_CONNECTION_REFUSED`

**Problem**: The Socket.io server is not running on port 3001.

**Solution**:
1. Open a terminal in the project root directory
2. Run: `node server.js`
3. You should see: `🚀 Socket.io server running on http://localhost:3001`
4. Refresh your browser

**Alternative**: If port 3001 is already in use:
1. Stop the existing process using port 3001
2. Or change the port in both `server.js` and `src/App.jsx`

---

## 🔴 Missing Icon Errors

### Error: `Failed to load resource: the server responded with a status of 404 () /icon-192x192.png`

**Problem**: The PWA manifest references icon files that don't exist.

**Solution**: ✅ Already fixed! The manifest.json now uses existing SVG icons instead of missing PNG files.

If you still see this error:
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Check that `public/manifest.json` uses `favicon.svg` instead of PNG icons

---

## 🔴 Manifest Icon Errors

### Error: `Error while trying to use the following icon from the Manifest: https://...`

**Problem**: Browser cached old manifest with missing icons.

**Solution**:
1. Clear browser cache completely
2. Close all browser tabs
3. Restart the dev server: `npm run dev`
4. Open in a new incognito/private window
5. The error should be gone

---

## 🔴 Module Not Found Errors

### Error: `Cannot find module 'socket.io'` or similar

**Problem**: Dependencies not installed.

**Solution**:
```bash
npm install
```

---

## 🔴 Port Already in Use

### Error: `EADDRINUSE: address already in use :::3001`

**Problem**: Another process is using port 3001.

**Solution**:

**Windows**:
```cmd
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux**:
```bash
lsof -ti:3001 | xargs kill -9
```

**Or change the port**:
1. In `server.js`: Change `const PORT = 3001;` to `const PORT = 3002;`
2. In `src/App.jsx`: Change `io('http://localhost:3001')` to `io('http://localhost:3002')`

---

## 🔴 CORS Errors

### Error: `Access to XMLHttpRequest at 'http://localhost:3001' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Problem**: CORS not configured properly.

**Solution**: ✅ Already configured in `server.js`:
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
```

If you're using a different port, update the `origin` value.

---

## 🔴 Vite Dev Server Not Starting

### Error: Various Vite errors

**Problem**: Vite configuration or dependency issues.

**Solution**:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Start dev server
npm run dev
```

---

## 🔴 Canvas Not Rendering

### Error: Blank white screen, no errors

**Problem**: React Konva not loading properly.

**Solution**:
1. Check browser console for errors
2. Verify React Konva is installed: `npm list react-konva`
3. If missing: `npm install react-konva konva`
4. Restart dev server

---

## 🔴 Drawings Not Syncing

### Problem: Multiple users can't see each other's drawings

**Checklist**:
1. ✅ Server running on port 3001?
2. ✅ Connection status shows green (🟢 Connected)?
3. ✅ Different usernames in each tab?
4. ✅ Browser console shows no errors?

**Solution**:
1. Check server console for "User connected" messages
2. Verify Socket.io events in browser Network tab
3. Restart server: Stop (Ctrl+C) and run `node server.js` again
4. Hard refresh all browser tabs (Ctrl+Shift+R)

---

## 🔴 Undo/Redo Not Working

### Problem: Undo/Redo buttons disabled or not responding

**Cause**: History not initialized properly.

**Solution**:
1. Draw something first - history starts after first action
2. Check that you're not at the beginning (undo) or end (redo) of history
3. Refresh the page to reset history

---

## 🔴 Eraser Not Working

### Problem: Eraser doesn't erase drawings

**Possible Causes**:
1. Drawing on non-white background
2. Eraser stroke width too small

**Solution**:
1. Increase stroke width (eraser is 3x the stroke width)
2. Make sure canvas background is white
3. Try drawing with pen first, then erase

---

## 🔴 Build Errors

### Error: Build fails with various errors

**Solution**:
```bash
# Clean build
npm run build

# If errors persist
rm -rf dist
npm run build

# Test production build locally
npm run preview
```

---

## 🟢 Quick Diagnostic Checklist

Before reporting an issue, verify:

- [ ] Node.js installed (v16 or higher)
- [ ] Dependencies installed (`npm install`)
- [ ] Server running (`node server.js`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser console shows no errors
- [ ] Connection status is green
- [ ] Using latest browser version
- [ ] No firewall blocking localhost connections

---

## 🆘 Still Having Issues?

1. **Check the logs**:
   - Browser console (F12)
   - Server terminal output
   - Network tab in DevTools

2. **Try a clean start**:
   ```bash
   # Stop all processes
   # Delete node_modules
   rm -rf node_modules package-lock.json
   
   # Reinstall
   npm install
   
   # Start server
   node server.js
   
   # In another terminal, start dev server
   npm run dev
   ```

3. **Test in incognito mode**: Rules out cache/extension issues

4. **Check GitHub Issues**: Someone might have had the same problem

---

## 📝 Reporting Bugs

When reporting issues, include:
- Error message (full text)
- Browser console screenshot
- Server terminal output
- Steps to reproduce
- Browser and OS version
- Node.js version (`node --version`)
