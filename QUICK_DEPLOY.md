# ⚡ Quick Deploy Guide

## 🚀 Deploy in 5 Steps

### Step 1: Build Frontend
```bash
npm run build
```

### Step 2: Upload Files
Upload the `dist` folder to your web server

### Step 3: Deploy Backend
Upload `server.js` and restart:
```bash
pm2 restart collab-whiteboard
```

### Step 4: Verify
Open: https://collab-whiteboard.phptutorialpoints.in
Check: 🟢 Connected status

### Step 5: Test
Open in 2 browsers, verify multi-user works

---

## 🔧 Configuration Files

### `.env.production`
```env
VITE_SOCKET_URL=https://collab-whiteboard.phptutorialpoints.in
```

### `server.js` (already configured)
```javascript
const allowedOrigins = [
  'https://collab-whiteboard.phptutorialpoints.in'
];
```

---

## ✅ Checklist

- [ ] Built with `npm run build`
- [ ] Uploaded `dist` folder
- [ ] Server running on port 3001
- [ ] SSL/HTTPS enabled
- [ ] Connection shows green
- [ ] Multi-user tested

---

## 🐛 Quick Fixes

**Connection Refused?**
```bash
pm2 restart collab-whiteboard
```

**Still localhost errors?**
```bash
rm -rf dist && npm run build
```

**CORS errors?**
Add your domain to `server.js` allowedOrigins

---

## 📚 Full Guides

- **PRODUCTION_SETUP_SUMMARY.md** - What changed & why
- **PRODUCTION_DEPLOYMENT.md** - Complete deployment guide
- **DEPLOYMENT_CHECKLIST.md** - Detailed checklist
- **COMMON_ERRORS.md** - Error solutions

---

## 🎯 That's It!

Your app now works in production! 🎉
