# 🎨 Customization Guide

This guide will help you personalize CollabBoard with your own branding, website, and developer information.

## 📝 Quick Customization Checklist

Replace the following placeholders throughout the project:

- `YOUR_NAME` - Your full name
- `YOUR_GITHUB_USERNAME` - Your GitHub username
- `YOUR_WEBSITE.com` - Your website URL
- `YOUR_TWITTER` - Your Twitter handle (optional)
- `your.email@example.com` - Your email address

## 📂 Files to Update

### 1. index.html (SEO & Meta Tags)

**Location**: `index.html`

Replace these placeholders:

```html
<!-- Line 11 -->
<meta name="author" content="YOUR_NAME" />

<!-- Lines 18-24 (Open Graph) -->
<meta property="og:url" content="https://YOUR_WEBSITE.com/" />
<meta property="og:image" content="https://YOUR_WEBSITE.com/og-image.png" />

<!-- Lines 27-31 (Twitter) -->
<meta property="twitter:url" content="https://YOUR_WEBSITE.com/" />
<meta property="twitter:image" content="https://YOUR_WEBSITE.com/twitter-image.png" />
<meta property="twitter:creator" content="@YOUR_TWITTER" />

<!-- Line 34 (Canonical) -->
<link rel="canonical" href="https://YOUR_WEBSITE.com/" />

<!-- Lines 52-66 (Structured Data) -->
"url": "https://YOUR_WEBSITE.com/",
"author": {
  "name": "YOUR_NAME",
  "url": "https://github.com/YOUR_GITHUB_USERNAME"
},
"creator": {
  "name": "YOUR_NAME",
  "url": "https://github.com/YOUR_GITHUB_USERNAME"
}
```

### 2. App.jsx (Developer Credits)

**Location**: `src/App.jsx`

Find and replace:

```jsx
// Line ~560 (Footer)
Made with ❤️ by <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer">YOUR_NAME</a>

// Lines ~590-600 (About Modal)
<h3>👨‍💻 Developer</h3>
<p>
  Created by <strong>YOUR_NAME</strong><br/>
  <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer">
    🔗 GitHub Profile
  </a>
  {' | '}
  <a href="https://YOUR_WEBSITE.com" target="_blank" rel="noopener noreferrer">
    🌐 Website
  </a>
</p>

// Line ~610 (GitHub Link)
<a href="https://github.com/YOUR_GITHUB_USERNAME/collab-whiteboard" target="_blank" rel="noopener noreferrer">
  ⭐ Star on GitHub
</a>
```

### 3. package.json (Project Metadata)

**Location**: `package.json`

Update these fields:

```json
{
  "author": "YOUR_NAME <your.email@example.com>",
  "homepage": "https://YOUR_WEBSITE.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_GITHUB_USERNAME/collab-whiteboard.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_GITHUB_USERNAME/collab-whiteboard/issues"
  }
}
```

### 4. README.md (Documentation)

**Location**: `README.md`

Replace in multiple locations:

```markdown
# Line 1 (Badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](...)

# Line 20 (Clone command)
git clone https://github.com/YOUR_GITHUB_USERNAME/collab-whiteboard.git

# Lines 180-185 (Developer section)
**YOUR_NAME**

- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)
- Website: [YOUR_WEBSITE.com](https://YOUR_WEBSITE.com)
- Email: your.email@example.com

# Line 220 (Support)
For support, email your.email@example.com or open an issue on GitHub.

# Line 224 (Footer)
Made with ❤️ by [YOUR_NAME](https://github.com/YOUR_GITHUB_USERNAME)
```

### 5. robots.txt (SEO)

**Location**: `public/robots.txt`

```txt
# Line 4
Sitemap: https://YOUR_WEBSITE.com/sitemap.xml
```

### 6. sitemap.xml (SEO)

**Location**: `public/sitemap.xml`

```xml
<!-- Line 4 -->
<loc>https://YOUR_WEBSITE.com/</loc>
```

## 🎨 Branding Customization

### Change App Name

If you want to rename "CollabBoard" to your own brand:

1. **index.html** - Update `<title>` tag
2. **App.jsx** - Update toolbar heading and modal title
3. **manifest.json** - Update `name` and `short_name`
4. **README.md** - Replace all instances of "CollabBoard"

### Change Color Scheme

**Location**: `src/App.css`

Find and replace the gradient colors:

```css
/* Current gradient: Purple (#667eea) to Violet (#764ba2) */

/* Replace with your colors */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);

/* Update in these classes: */
- .app
- .join-screen
- .join-card h1
- .join-card button
- .toolbar h2
- .toolbar button.active
- .info-banner
- .modal-content h2
```

**Also update in**:
- `index.html` - `<meta name="theme-color">`
- `manifest.json` - `theme_color`

### Custom Favicon

Replace these files in `public/`:
- `favicon.svg` - Main favicon (SVG format)
- `favicon-32x32.png` - 32x32 PNG
- `favicon-16x16.png` - 16x16 PNG
- `apple-touch-icon.png` - 180x180 PNG for iOS
- `icon-192x192.png` - 192x192 PNG for PWA
- `icon-512x512.png` - 512x512 PNG for PWA

**Tools to create favicons**:
- [Favicon.io](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

## 🖼️ Social Media Images

Create and add these images to `public/`:

### Open Graph Image (Facebook, LinkedIn)
- **Filename**: `og-image.png`
- **Size**: 1200x630 pixels
- **Format**: PNG or JPG
- **Content**: App screenshot or branded graphic

### Twitter Card Image
- **Filename**: `twitter-image.png`
- **Size**: 1200x675 pixels
- **Format**: PNG or JPG
- **Content**: Similar to OG image

### Screenshots for PWA
- **Filename**: `screenshot-wide.png`
- **Size**: 1280x720 pixels
- **Filename**: `screenshot-mobile.png`
- **Size**: 750x1334 pixels

## 🔧 Advanced Customization

### Add Google Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Custom Domain

1. Update all URLs from `YOUR_WEBSITE.com` to your actual domain
2. Configure DNS settings with your hosting provider
3. Update CORS settings in `server.js`:

```javascript
const io = new Server(httpServer, {
  cors: {
    origin: "https://yourdomain.com",
    methods: ["GET", "POST"]
  }
});
```

### Environment Variables

Create `.env` file:

```env
VITE_APP_NAME=CollabBoard
VITE_DEVELOPER_NAME=YOUR_NAME
VITE_GITHUB_USERNAME=YOUR_GITHUB_USERNAME
VITE_WEBSITE_URL=https://YOUR_WEBSITE.com
VITE_SERVER_URL=http://localhost:3001
```

Then use in code:

```javascript
const serverUrl = import.meta.env.VITE_SERVER_URL;
socketRef.current = io(serverUrl);
```

## ✅ Verification Checklist

After customization, verify:

- [ ] All placeholder text replaced
- [ ] Links work correctly
- [ ] Favicon displays properly
- [ ] Social media preview looks good (use [OpenGraph.xyz](https://www.opengraph.xyz/))
- [ ] PWA installs correctly
- [ ] GitHub repository link works
- [ ] Email links work
- [ ] Website links work
- [ ] Color scheme matches your brand
- [ ] App name is correct everywhere

## 🚀 Deployment Checklist

Before deploying:

- [ ] Update `socketRef.current = io('...')` with production server URL
- [ ] Add production domain to CORS whitelist
- [ ] Update all URLs from localhost to production
- [ ] Test on multiple devices
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Test PWA installation
- [ ] Verify SSL certificate

## 📞 Need Help?

If you need help with customization:
1. Check the documentation files
2. Open an issue on GitHub
3. Contact: your.email@example.com

---

Happy customizing! 🎨✨
