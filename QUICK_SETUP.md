# ⚡ Quick Setup Guide

Follow these steps to personalize your CollabBoard app in 5 minutes!

## Step 1: Gather Your Information

Write down these details:

```
Your Name: _______________________
GitHub Username: _______________________
Website URL: _______________________
Email: _______________________
Twitter Handle (optional): _______________________
```

## Step 2: Find & Replace

Use your code editor's "Find in Files" feature (Ctrl+Shift+F or Cmd+Shift+F) to replace:

### Replace #1: Your Name
- **Find**: `YOUR_NAME`
- **Replace with**: Your actual name (e.g., "John Doe")
- **Files**: All files

### Replace #2: GitHub Username
- **Find**: `YOUR_GITHUB_USERNAME`
- **Replace with**: Your GitHub username (e.g., "johndoe")
- **Files**: All files

### Replace #3: Website URL
- **Find**: `YOUR_WEBSITE.com`
- **Replace with**: Your website URL (e.g., "johndoe.dev")
- **Files**: All files

### Replace #4: Email
- **Find**: `your.email@example.com`
- **Replace with**: Your email (e.g., "john@johndoe.dev")
- **Files**: All files

### Replace #5: Twitter (Optional)
- **Find**: `@YOUR_TWITTER`
- **Replace with**: Your Twitter handle (e.g., "@johndoe")
- **Files**: index.html only

## Step 3: Create Images

### Required Images (place in `public/` folder):

1. **Favicon Images**
   - Use [Favicon.io](https://favicon.io/) to generate from text or image
   - Download and extract to `public/`
   - Files needed:
     - `favicon-16x16.png`
     - `favicon-32x32.png`
     - `apple-touch-icon.png`

2. **PWA Icons**
   - Use [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
   - Upload your logo/icon
   - Download 192x192 and 512x512 versions
   - Save as:
     - `public/icon-192x192.png`
     - `public/icon-512x512.png`

3. **Social Media Images**
   - Use [Canva](https://www.canva.com/) or similar
   - Create with these dimensions:
     - `public/og-image.png` (1200x630px) - For Facebook/LinkedIn
     - `public/twitter-image.png` (1200x675px) - For Twitter
   - Include app name, tagline, and screenshot

4. **Screenshots (Optional)**
   - Take screenshots of your app
   - Resize to:
     - `public/screenshot-wide.png` (1280x720px)
     - `public/screenshot-mobile.png` (750x1334px)

## Step 4: Update Server URL (For Production)

When deploying, update the Socket.io connection:

**File**: `src/App.jsx`

Find this line (around line 35):
```javascript
socketRef.current = io('http://localhost:3001');
```

Replace with your production server URL:
```javascript
socketRef.current = io('https://your-server-url.com');
```

**File**: `server.js`

Update CORS origin (around line 9):
```javascript
cors: {
  origin: "https://your-website.com",
  methods: ["GET", "POST"]
}
```

## Step 5: Test Everything

Run these checks:

```bash
# Install dependencies
npm install

# Start the app
npm start
```

Then verify:
- [ ] App loads at http://localhost:5173
- [ ] Your name appears in footer
- [ ] Click "ℹ️ About" - check all links work
- [ ] Favicon shows in browser tab
- [ ] All placeholder text is replaced

## Step 6: Optional Customization

### Change App Name (from "CollabBoard")

If you want a different name:

1. **index.html** - Update `<title>` tag
2. **src/App.jsx** - Update toolbar `<h2>` and modal title
3. **public/manifest.json** - Update `name` and `short_name`
4. **README.md** - Replace "CollabBoard" throughout

### Change Color Scheme

**File**: `src/App.css`

Find and replace these colors:
- `#667eea` (purple) → Your primary color
- `#764ba2` (violet) → Your secondary color

Also update:
- **index.html**: `<meta name="theme-color">`
- **public/manifest.json**: `theme_color`

## Step 7: Deploy

### Deploy Frontend (Vercel/Netlify)

```bash
# Build production bundle
npm run build

# Deploy 'dist' folder
```

### Deploy Backend (Render/Railway/Heroku)

Deploy `server.js` to your preferred platform.

## 🎉 You're Done!

Your app is now:
- ✅ Fully personalized with your info
- ✅ SEO optimized
- ✅ Ready for social media sharing
- ✅ PWA enabled
- ✅ Production ready

## 📚 Additional Resources

- **Full Customization**: See `CUSTOMIZATION_GUIDE.md`
- **SEO Details**: See `SEO_ENHANCEMENTS.md`
- **Features**: See `NEW_FEATURES.md`
- **Testing**: See `TESTING_GUIDE.md`

## 🆘 Need Help?

1. Check the documentation files
2. Open an issue on GitHub
3. Email: your.email@example.com

---

**Happy coding! 🚀**
