# 🚀 Quick Deployment Checklist

## Before Deploying

### 1. Update Environment Configuration ⚙️

- [ ] Update `.env.production` with your production server URL:
  ```env
  VITE_SOCKET_URL=https://collab-whiteboard.phptutorialpoints.in
  ```

- [ ] Update `server.js` allowed origins to include your domain:
  ```javascript
  const allowedOrigins = [
    'http://localhost:5173',
    'https://collab-whiteboard.phptutorialpoints.in'
  ];
  ```

### 2. Build & Test 🏗️

- [ ] Install dependencies: `npm install`
- [ ] Build frontend: `npm run build`
- [ ] Test build locally: `npm run preview`
- [ ] Test server locally: `node server.js`
- [ ] Verify no console errors

### 3. Server Setup 🖥️

- [ ] Upload/deploy server files (`server.js`, `package.json`, `node_modules`)
- [ ] Set environment variable: `PORT=3001` (or your preferred port)
- [ ] Install PM2: `npm install -g pm2`
- [ ] Start server: `pm2 start server.js --name collab-whiteboard`
- [ ] Enable auto-restart: `pm2 startup && pm2 save`

### 4. Frontend Deployment 🌐

- [ ] Upload `dist` folder contents to web server
- [ ] Configure web server (Nginx/Apache) for:
  - [ ] Serving static files
  - [ ] WebSocket proxy to backend
  - [ ] SPA routing (serve index.html for all routes)

### 5. SSL/HTTPS 🔒

- [ ] Install SSL certificate (Let's Encrypt recommended)
- [ ] Configure HTTPS in web server
- [ ] Verify WebSocket works over WSS (secure WebSocket)
- [ ] Update all URLs to use `https://`

### 6. DNS & Networking 🌍

- [ ] DNS A record points to your server IP
- [ ] Firewall allows ports 80, 443, and your backend port (3001)
- [ ] Test domain resolves correctly: `ping collab-whiteboard.phptutorialpoints.in`

### 7. Testing 🧪

- [ ] Open site in browser: https://collab-whiteboard.phptutorialpoints.in
- [ ] Check connection status shows green (🟢 Connected)
- [ ] Open in second browser/tab with different username
- [ ] Verify user count shows 2
- [ ] Test drawing synchronization
- [ ] Test all tools (pen, eraser, shapes, etc.)
- [ ] Test undo/redo
- [ ] Test export functionality
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)

### 8. Monitoring 📊

- [ ] Check server logs: `pm2 logs collab-whiteboard`
- [ ] Monitor server status: `pm2 status`
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Set up uptime monitoring

### 9. Security 🔐

- [ ] HTTPS enabled
- [ ] CORS properly configured (not using `*`)
- [ ] Environment variables not in Git
- [ ] Server firewall configured
- [ ] Run security audit: `npm audit`

### 10. Documentation 📚

- [ ] Update README with production URL
- [ ] Document any custom configuration
- [ ] Share deployment guide with team

---

## Quick Commands Reference

### Build
```bash
npm install
npm run build
```

### Deploy Server (PM2)
```bash
pm2 start server.js --name collab-whiteboard
pm2 save
pm2 startup
```

### Check Status
```bash
pm2 status
pm2 logs collab-whiteboard
```

### Restart After Updates
```bash
git pull
npm install
npm run build
pm2 restart collab-whiteboard
```

### SSL (Let's Encrypt)
```bash
sudo certbot --nginx -d collab-whiteboard.phptutorialpoints.in
```

---

## Common Issues & Quick Fixes

### ❌ Connection Refused
```bash
# Check if server is running
pm2 status

# Restart server
pm2 restart collab-whiteboard

# Check logs
pm2 logs collab-whiteboard
```

### ❌ CORS Error
Update `server.js` allowedOrigins array with your domain

### ❌ 404 on Refresh
Configure web server to serve index.html for all routes

### ❌ WebSocket Not Working
Check Nginx/Apache WebSocket proxy configuration

---

## Post-Deployment

- [ ] Monitor for 24 hours
- [ ] Check error logs
- [ ] Verify user feedback
- [ ] Document any issues
- [ ] Plan for scaling if needed

---

## 🎉 Success!

Your collaborative whiteboard is now live at:
**https://collab-whiteboard.phptutorialpoints.in**

Share it with your users and enjoy real-time collaboration! 🚀
