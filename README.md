# 🎨 CollabBoard - Real-Time Collaborative Whiteboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.3-010101?logo=socket.io)](https://socket.io/)
[![Konva](https://img.shields.io/badge/Konva-10.2.0-blue)](https://konvajs.org/)

> A powerful, free, and open-source real-time collaborative whiteboard for teams, educators, and creative professionals. Draw together, brainstorm ideas, and collaborate visually with multiple users in real-time.

![CollabBoard Demo](https://via.placeholder.com/1200x600/667eea/ffffff?text=CollabBoard+Demo)

## ✨ Features

### 🎨 Drawing Tools
- **✏️ Pen Tool** - Freehand drawing with smooth curves
- **🧹 Eraser** - Remove drawings with adjustable size
- **─ Line Tool** - Draw straight lines
- **→ Arrow Tool** - Create arrows with pointer heads
- **▭ Rectangle** - Draw rectangles with optional fill
- **○ Circle** - Draw circles with optional fill
- **T Text** - Add draggable text annotations
- **📝 Sticky Notes** - Add colorful sticky notes

### 🎛️ Customization
- **Color Picker** - Choose any stroke and fill color
- **Stroke Width** - Adjustable from 1px to 20px with presets
- **Fill Toggle** - Enable/disable shape fills
- **Visual Presets** - Quick access to common sizes

### 👥 Real-Time Collaboration
- **Multi-User Support** - Unlimited concurrent users
- **Live Cursor Tracking** - See where others are drawing
- **User Presence** - Real-time user list with indicators
- **Connection Status** - Visual connection state indicator
- **Canvas Sync** - All drawings sync instantly across users

### ⚡ Productivity Features
- **Undo/Redo** - Full history with keyboard shortcuts
- **Export to PNG** - Save your whiteboard as an image
- **Keyboard Shortcuts** - Fast tool switching and actions
- **Canvas Persistence** - New users see existing drawings
- **Synchronized Clear** - Clear canvas for all users

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/umang48/collab-whiteboard.git

# Navigate to project directory
cd collab-whiteboard

# Install dependencies
npm install

# Start both server and client
npm start
```

The app will open at `http://localhost:5173` with the server running on `http://localhost:3001`.

### Alternative: Run Separately

```bash
# Terminal 1 - Start the Socket.io server
npm run server

# Terminal 2 - Start the React development server
npm run dev
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `P` | Pen tool |
| `E` | Eraser tool |
| `L` | Line tool |
| `A` | Arrow tool |
| `R` | Rectangle tool |
| `C` | Circle tool |
| `T` | Text tool |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+S` | Export canvas |

## 🛠️ Tech Stack

- **Frontend**: React 19, Konva (Canvas rendering), Socket.io Client
- **Backend**: Node.js, Express, Socket.io Server
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features

## 📦 Project Structure

```
collab-whiteboard/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/
│   ├── favicon.svg      # App icon
│   ├── manifest.json    # PWA manifest
│   ├── robots.txt       # SEO robots file
│   └── sitemap.xml      # SEO sitemap
├── server.js            # Socket.io server
├── index.html           # HTML template with SEO
└── package.json         # Dependencies
```

## 🌐 Deployment

### Deploy to Vercel/Netlify (Frontend)

```bash
# Build the production bundle
npm run build

# Deploy the 'dist' folder to your hosting service
```

### Deploy Server (Backend)

Deploy `server.js` to:
- Heroku
- Railway
- Render
- DigitalOcean
- AWS/Azure/GCP

Update the Socket.io connection URL in `src/App.jsx`:
```javascript
socketRef.current = io('https://your-server-url.com');
```

## 🎯 Use Cases

- **Remote Teams** - Brainstorm and collaborate visually
- **Online Education** - Teach and explain concepts with drawings
- **Design Reviews** - Sketch ideas and get feedback
- **Workshops** - Interactive sessions with participants
- **Presentations** - Live drawing during talks
- **Game Planning** - Strategy and tactics visualization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**YOUR_NAME**

- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/umang48)
- Website: [YOUR_WEBSITE.com](https://phptutorialpoints.in/)
- Email: your.email@example.com

## 🌟 Show Your Support

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔀 Contributing code

## 📊 SEO & Discoverability

This project is optimized for search engines with:
- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (Schema.org)
- Semantic HTML
- Mobile-responsive design
- Fast loading times
- PWA support

## 🔮 Roadmap

- [ ] Shape selection and manipulation
- [ ] Layers support
- [ ] Background grid/templates
- [ ] Zoom and pan
- [ ] More shape types (triangle, star, polygon)
- [ ] Room/session management
- [ ] Chat functionality
- [ ] File upload and image insertion
- [ ] Collaborative text editing
- [ ] Version history

## 📞 Support

For support, email your.email@example.com or open an issue on GitHub.

---

Made with ❤️ by [Umang Prajapati](https://github.com/umang48)

**Star ⭐ this repository if you find it helpful!**
