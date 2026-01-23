# 🚀 Deployment Guide

Deploy your collaborative whiteboard to production!

## Architecture Overview

```
Frontend (React + Vite)  →  Backend (Socket.io Server)
     Vercel/Netlify     →     Heroku/Railway/Render
```

## Option 1: Quick Deploy (Recommended)

### Frontend: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Vite
6. Add environment variable:
   - `VITE_SOCKET_URL` = your backend URL
7. Deploy!

### Backend: Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add a new service
5. Set start command: `node server.js`
6. Railway provides a URL (e.g., `https://your-app.railway.app`)
7. Copy this URL for frontend config

### Connect Them

Update `src/App.jsx`:
```javascript
// Replace line 38
socketRef.current = io('https://your-backend.railway.app');
```

Or use environment variable:
```javascript
socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001');
```

## Option 2: Heroku

### Backend Deployment

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-whiteboard-server`
4. Add Procfile:
```
web: node server.js
```
5. Deploy:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Frontend Deployment

Same as Vercel above, or use Netlify:

1. Build: `npm run build`
2. Drag `dist` folder to [netlify.com](https://netlify.com)
3. Done!

## Option 3: Self-Hosted (VPS)

### Requirements
- Ubuntu 20.04+ server
- Node.js 16+
- Nginx
- Domain name (optional)

### Backend Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repo
git clone https://github.com/yourusername/collab-whiteboard.git
cd collab-whiteboard

# Install dependencies
npm install

# Install PM2 for process management
sudo npm install -g pm2

# Start server
pm2 start server.js --name whiteboard-server
pm2 save
pm2 startup
```

### Frontend Setup

```bash
# Build frontend
npm run build

# Install Nginx
sudo apt install nginx

# Copy build files
sudo cp -r dist/* /var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

## Environment Variables

### Frontend (.env)
```env
VITE_SOCKET_URL=https://your-backend-url.com
```

### Backend (.env)
```env
PORT=3001
CORS_ORIGIN=https://your-frontend-url.com
NODE_ENV=production
```

Update `server.js`:
```javascript
const PORT = process.env.PORT || 3001;

cors: {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"]
}
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Update Socket.io Connection

```javascript
// Use wss:// for secure WebSocket
socketRef.current = io('https://your-backend-url.com', {
  secure: true,
  rejectUnauthorized: false
});
```

## Scaling Considerations

### For High Traffic

1. **Use Redis for Socket.io**
```bash
npm install @socket.io/redis-adapter redis
```

```javascript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

2. **Load Balancing**
- Use Nginx or HAProxy
- Enable sticky sessions
- Distribute across multiple servers

3. **CDN for Frontend**
- Cloudflare
- AWS CloudFront
- Vercel Edge Network

## Monitoring

### Backend Monitoring

```bash
# PM2 monitoring
pm2 monit

# Logs
pm2 logs whiteboard-server
```

### Error Tracking
- Sentry
- LogRocket
- Datadog

## Cost Estimates

### Free Tier (Good for demos)
- Frontend: Vercel/Netlify (Free)
- Backend: Railway (Free tier)
- Total: $0/month

### Production (Small team)
- Frontend: Vercel Pro ($20/month)
- Backend: Railway Pro ($5/month)
- Database: Redis Cloud ($5/month)
- Total: $30/month

### Enterprise (High traffic)
- Frontend: Vercel Enterprise ($150/month)
- Backend: AWS/GCP ($100+/month)
- Database: Redis Enterprise ($50+/month)
- CDN: Cloudflare ($20/month)
- Total: $320+/month

## Troubleshooting

### CORS Errors
- Check CORS origin in server.js
- Ensure URLs match exactly (http vs https)
- Check browser console for details

### WebSocket Connection Failed
- Verify server is running
- Check firewall rules (port 3001)
- Ensure SSL is configured for wss://

### Slow Performance
- Enable compression in Nginx
- Use CDN for static assets
- Optimize bundle size
- Add Redis for scaling

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Sanitize user inputs
- [ ] Use environment variables
- [ ] Enable security headers
- [ ] Regular dependency updates

## Post-Deployment

1. Test all features in production
2. Monitor error logs
3. Set up analytics (Google Analytics, Plausible)
4. Create backup strategy
5. Document API endpoints
6. Set up CI/CD pipeline

---

Your collaborative whiteboard is now live! 🎉

For support, check the main README or open an issue on GitHub.
