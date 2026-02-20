# Production Deployment Guide

## 🚀 Deploying to Production

This guide covers deploying your collaborative whiteboard to a production environment.

---

## ⚙️ Configuration Steps

### 1. Environment Variables

#### Frontend (.env.production)
Create or update `.env.production` with your production server URL:

```env
VITE_SOCKET_URL=https://collab-whiteboard.phptutorialpoints.in
```

**Important**: 
- Use `https://` for production (secure WebSocket)
- Must match your actual deployed server URL
- No trailing slash

#### Server (Environment Variables)
Set these on your server hosting platform:

```env
PORT=3001
NODE_ENV=production
```

### 2. Update Server CORS Configuration

In `server.js`, the allowed origins are already configured:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://collab-whiteboard.phptutorialpoints.in'
];
```

**Add your domain** if different:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://collab-whiteboard.phptutorialpoints.in',
  'https://your-custom-domain.com'  // Add your domain
];
```

---

## 🏗️ Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Frontend
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### 3. Test Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Same Server (Frontend + Backend)

If deploying both on the same server:

**Structure**:
```
/var/www/collab-whiteboard/
├── dist/              # Frontend build files
├── server.js          # Backend server
├── node_modules/
└── package.json
```

**Steps**:
1. Upload `dist` folder contents to web root
2. Upload `server.js`, `package.json`, `node_modules`
3. Start server: `node server.js` or use PM2
4. Configure web server (Nginx/Apache) to:
   - Serve static files from `dist`
   - Proxy WebSocket connections to Node.js server

**Nginx Configuration Example**:
```nginx
server {
    listen 80;
    server_name collab-whiteboard.phptutorialpoints.in;

    # Serve static files
    location / {
        root /var/www/collab-whiteboard/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy Socket.io connections
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Option 2: Separate Servers (Recommended)

**Frontend**: Deploy to Vercel, Netlify, or static hosting
**Backend**: Deploy to Heroku, Railway, DigitalOcean, etc.

#### Frontend Deployment (Vercel/Netlify)

**Vercel**:
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Environment Variables** (set in hosting dashboard):
```
VITE_SOCKET_URL=https://your-backend-server.com
```

#### Backend Deployment (Heroku Example)

1. **Create Heroku app**:
```bash
heroku create collab-whiteboard-server
```

2. **Set environment variables**:
```bash
heroku config:set NODE_ENV=production
```

3. **Deploy**:
```bash
git push heroku main
```

4. **Update frontend .env.production**:
```env
VITE_SOCKET_URL=https://collab-whiteboard-server.herokuapp.com
```

---

## 🔒 SSL/HTTPS Configuration

**Critical**: Production MUST use HTTPS for WebSocket security.

### Using Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d collab-whiteboard.phptutorialpoints.in

# Auto-renewal
sudo certbot renew --dry-run
```

### Update Socket.io URL
After SSL setup, update `.env.production`:
```env
VITE_SOCKET_URL=https://collab-whiteboard.phptutorialpoints.in
```

---

## 🔄 Process Management (PM2)

Keep your Node.js server running with PM2:

### Install PM2
```bash
npm install -g pm2
```

### Start Server
```bash
pm2 start server.js --name collab-whiteboard
```

### Auto-restart on reboot
```bash
pm2 startup
pm2 save
```

### Monitor
```bash
pm2 status
pm2 logs collab-whiteboard
pm2 monit
```

### Restart after updates
```bash
pm2 restart collab-whiteboard
```

---

## 🧪 Testing Production Deployment

### 1. Check Server Status
```bash
curl https://collab-whiteboard.phptutorialpoints.in/socket.io/
```

Should return Socket.io handshake response.

### 2. Test WebSocket Connection
Open browser console on your site:
```javascript
const socket = io('https://collab-whiteboard.phptutorialpoints.in');
socket.on('connect', () => console.log('Connected!'));
```

### 3. Multi-User Test
1. Open site in two different browsers
2. Join with different usernames
3. Verify user count shows 2
4. Test drawing synchronization

---

## 🐛 Common Production Issues

### Issue 1: WebSocket Connection Failed

**Symptoms**: Red connection status, "ERR_CONNECTION_REFUSED"

**Solutions**:
- ✅ Verify server is running: `pm2 status`
- ✅ Check firewall allows port 3001
- ✅ Verify CORS configuration includes your domain
- ✅ Check SSL certificate is valid
- ✅ Ensure WebSocket proxy is configured in Nginx/Apache

### Issue 2: Mixed Content Errors

**Symptoms**: "Mixed Content" warnings in console

**Solution**: Ensure VITE_SOCKET_URL uses `https://` not `http://`

### Issue 3: CORS Errors

**Symptoms**: "blocked by CORS policy"

**Solution**: Add your domain to `allowedOrigins` in `server.js`:
```javascript
const allowedOrigins = [
  'https://collab-whiteboard.phptutorialpoints.in',
  'https://www.collab-whiteboard.phptutorialpoints.in'  // Add www version
];
```

### Issue 4: 404 on Refresh

**Symptoms**: Page works initially but 404 on refresh

**Solution**: Configure server to serve `index.html` for all routes:

**Nginx**:
```nginx
try_files $uri $uri/ /index.html;
```

**Express** (if serving static files):
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

---

## 📊 Performance Optimization

### 1. Enable Gzip Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. Cache Static Assets

**Nginx**:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Use CDN
Consider using Cloudflare or similar CDN for:
- DDoS protection
- Global content delivery
- SSL/TLS
- Caching

---

## 🔐 Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] CORS properly configured (not using `*`)
- [ ] Environment variables not committed to Git
- [ ] Server firewall configured
- [ ] Rate limiting implemented (optional)
- [ ] Input validation on server
- [ ] Regular dependency updates (`npm audit`)

---

## 📈 Monitoring

### Server Monitoring
```bash
# PM2 monitoring
pm2 monit

# Check logs
pm2 logs collab-whiteboard --lines 100

# Server resources
htop
```

### Application Monitoring
Consider adding:
- **Sentry** for error tracking
- **Google Analytics** for usage stats
- **LogRocket** for session replay

---

## 🔄 Update Deployment

### Update Frontend
```bash
# Pull latest code
git pull

# Install dependencies
npm install

# Build
npm run build

# Deploy (depends on hosting)
# Vercel: vercel --prod
# Netlify: netlify deploy --prod --dir=dist
# Manual: Upload dist folder
```

### Update Backend
```bash
# Pull latest code
git pull

# Install dependencies
npm install

# Restart server
pm2 restart collab-whiteboard
```

---

## 🎯 Production Checklist

Before going live:

- [ ] `.env.production` configured with correct URL
- [ ] Server CORS includes production domain
- [ ] SSL certificate installed and valid
- [ ] Server running with PM2 or similar
- [ ] Nginx/Apache configured for WebSocket proxy
- [ ] Firewall allows necessary ports
- [ ] DNS configured correctly
- [ ] Tested multi-user functionality
- [ ] Tested all drawing tools
- [ ] Tested on multiple browsers
- [ ] Mobile responsive tested
- [ ] Error monitoring setup
- [ ] Backup strategy in place

---

## 📞 Support

If you encounter issues:

1. Check server logs: `pm2 logs collab-whiteboard`
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Test WebSocket connection manually
5. Review COMMON_ERRORS.md for solutions

---

## 🎉 Your Production URL

Once deployed, your app will be available at:
**https://collab-whiteboard.phptutorialpoints.in**

Share this URL with your users for real-time collaboration!
