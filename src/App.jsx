import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, Arrow, Text as KonvaText } from 'react-konva';
import io from 'socket.io-client';
import './App.css';

const useMockSocket = false;

// Get Socket.io server URL from environment variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

function App() {
  const [tool, setTool] = useState('pen');
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [cursors, setCursors] = useState({});
  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [showUsers, setShowUsers] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [fillColor, setFillColor] = useState('transparent');
  const [showStrokePanel, setShowStrokePanel] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const socketRef = useRef(null);
  const stageRef = useRef(null);
  const currentShapeRef = useRef(null);

  useEffect(() => {
    if (!isJoined) return;

    if (useMockSocket) {
      socketRef.current = {
        emit: (event, data) => console.log('Emit:', event, data),
        on: () => {},
        off: () => {},
      };
    } else {
      // Real Socket.io connection - uses environment variable
      socketRef.current = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      
      socketRef.current.on('connect', () => {
        setConnectionStatus('connected');
        console.log('Connected to server:', SOCKET_URL);
        socketRef.current.emit('join', { username });
      });

      socketRef.current.on('disconnect', () => {
        setConnectionStatus('disconnected');
      });

      socketRef.current.on('connect_error', () => {
        setConnectionStatus('error');
      });

      socketRef.current.on('draw', (data) => {
        setShapes(prev => [...prev, data.shape]);
      });

      socketRef.current.on('cursor-move', (data) => {
        setCursors(prev => ({ ...prev, [data.userId]: data }));
      });

      socketRef.current.on('users', (userList) => {
        console.log('Users updated:', userList);
        setUsers(userList);
      });

      socketRef.current.on('clear-canvas', () => {
        setShapes([]);
        setHistory([[]]);
        setHistoryStep(0);
      });

      socketRef.current.on('initial-state', (state) => {
        setShapes(state.shapes || []);
        setHistory([state.shapes || []]);
        setHistoryStep(0);
      });

      return () => socketRef.current.disconnect();
    }
  }, [isJoined, username]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          undo();
        } else if (e.key === 'y') {
          e.preventDefault();
          redo();
        } else if (e.key === 's') {
          e.preventDefault();
          exportCanvas();
        }
      }
      
      // Tool shortcuts
      if (!e.ctrlKey && !e.metaKey) {
        if (e.key === 'p') setTool('pen');
        if (e.key === 'e') setTool('eraser');
        if (e.key === 'r') setTool('rectangle');
        if (e.key === 'c') setTool('circle');
        if (e.key === 'a') setTool('arrow');
        if (e.key === 'l') setTool('line');
        if (e.key === 't') setTool('text');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyStep, history]);

  const saveToHistory = (newShapes) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newShapes);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const handleMouseDown = (e) => {
    if (!isJoined) return;
    
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);

    if (tool === 'pen') {
      currentShapeRef.current = {
        type: 'line',
        points: [pos.x, pos.y],
        stroke: color,
        strokeWidth: strokeWidth,
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
      };
      setShapes([...shapes, currentShapeRef.current]);
    } else if (tool === 'eraser') {
      currentShapeRef.current = {
        type: 'line',
        points: [pos.x, pos.y],
        stroke: '#FFFFFF',
        strokeWidth: strokeWidth * 3,
        tension: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        globalCompositeOperation: 'destination-out',
      };
      setShapes([...shapes, currentShapeRef.current]);
    } else if (tool === 'rectangle') {
      currentShapeRef.current = {
        type: 'rectangle',
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        stroke: color,
        strokeWidth: strokeWidth,
        fill: fillColor,
      };
      setShapes([...shapes, currentShapeRef.current]);
    } else if (tool === 'circle') {
      currentShapeRef.current = {
        type: 'circle',
        x: pos.x,
        y: pos.y,
        radius: 0,
        stroke: color,
        strokeWidth: strokeWidth,
        fill: fillColor,
      };
      setShapes([...shapes, currentShapeRef.current]);
    } else if (tool === 'arrow') {
      currentShapeRef.current = {
        type: 'arrow',
        points: [pos.x, pos.y, pos.x, pos.y],
        stroke: color,
        strokeWidth: strokeWidth,
        fill: color,
      };
      setShapes([...shapes, currentShapeRef.current]);
    } else if (tool === 'line') {
      currentShapeRef.current = {
        type: 'line',
        points: [pos.x, pos.y, pos.x, pos.y],
        stroke: color,
        strokeWidth: strokeWidth,
        lineCap: 'round',
      };
      setShapes([...shapes, currentShapeRef.current]);
    } else if (tool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        const newShape = {
          type: 'text',
          x: pos.x,
          y: pos.y,
          text: text,
          fontSize: strokeWidth * 10,
          fill: color,
          draggable: true,
        };
        const newShapes = [...shapes, newShape];
        setShapes(newShapes);
        saveToHistory(newShapes);
        socketRef.current?.emit('draw', { shape: newShape });
      }
      setIsDrawing(false);
      return;
    } else if (tool === 'sticky') {
      const newShape = {
        type: 'sticky',
        x: pos.x,
        y: pos.y,
        text: 'Double-click to edit',
        width: 150,
        height: 100,
        fill: '#FFF59D',
      };
      const newShapes = [...shapes, newShape];
      setShapes(newShapes);
      saveToHistory(newShapes);
      socketRef.current?.emit('draw', { shape: newShape });
      setIsDrawing(false);
      return;
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    socketRef.current?.emit('cursor-move', {
      userId: username,
      x: pos.x,
      y: pos.y,
      username
    });

    if (!isDrawing || !currentShapeRef.current) return;

    const updatedShapes = shapes.slice();
    const lastShape = updatedShapes[updatedShapes.length - 1];

    if (tool === 'pen' || tool === 'eraser') {
      lastShape.points = lastShape.points.concat([pos.x, pos.y]);
    } else if (tool === 'rectangle') {
      lastShape.width = pos.x - lastShape.x;
      lastShape.height = pos.y - lastShape.y;
    } else if (tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(pos.x - lastShape.x, 2) + Math.pow(pos.y - lastShape.y, 2)
      );
      lastShape.radius = radius;
    } else if (tool === 'arrow' || tool === 'line') {
      lastShape.points = [lastShape.points[0], lastShape.points[1], pos.x, pos.y];
    }

    setShapes(updatedShapes);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentShapeRef.current) {
      saveToHistory(shapes);
      socketRef.current?.emit('draw', { shape: currentShapeRef.current });
      currentShapeRef.current = null;
    }
  };

  const clearCanvas = () => {
    setShapes([]);
    setHistory([[]]);
    setHistoryStep(0);
    socketRef.current?.emit('clear-canvas');
  };

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      setShapes(history[newStep]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      setShapes(history[newStep]);
    }
  };

  const exportCanvas = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderShape = (shape, index) => {
    const key = `shape-${index}`;

    switch (shape.type) {
      case 'line':
        return (
          <Line
            key={key}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            tension={shape.tension}
            lineCap={shape.lineCap}
            lineJoin={shape.lineJoin}
            globalCompositeOperation={shape.globalCompositeOperation}
          />
        );
      case 'rectangle':
        return (
          <Rect
            key={key}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
          />
        );
      case 'circle':
        return (
          <Circle
            key={key}
            x={shape.x}
            y={shape.y}
            radius={shape.radius}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
          />
        );
      case 'arrow':
        return (
          <Arrow
            key={key}
            points={shape.points}
            stroke={shape.stroke}
            strokeWidth={shape.strokeWidth}
            fill={shape.fill}
            pointerLength={10}
            pointerWidth={10}
          />
        );
      case 'text':
        return (
          <KonvaText
            key={key}
            x={shape.x}
            y={shape.y}
            text={shape.text}
            fontSize={shape.fontSize}
            fill={shape.fill}
            draggable={shape.draggable}
          />
        );
      case 'sticky':
        return (
          <React.Fragment key={key}>
            <Rect
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              shadowBlur={5}
              shadowOpacity={0.3}
              cornerRadius={4}
              draggable
            />
            <KonvaText
              x={shape.x + 10}
              y={shape.y + 10}
              text={shape.text}
              fontSize={14}
              width={shape.width - 20}
              height={shape.height - 20}
              fill="#000"
            />
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  if (!isJoined) {
    return (
      <div className="join-screen">
        <div className="join-card">
          <h1>🎨 Collaborative Whiteboard</h1>
          <p>Real-time drawing and collaboration</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && username && setIsJoined(true)}
          />
          <button onClick={() => username && setIsJoined(true)} disabled={!username}>
            Join Whiteboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="toolbar">
        <div className="toolbar-section">
          <h2>🎨 Whiteboard</h2>
          <span className="user-badge">👤 {username}</span>
          <span className={`connection-status ${connectionStatus}`}>
            {connectionStatus === 'connected' && '🟢 Connected'}
            {connectionStatus === 'connecting' && '🟡 Connecting...'}
            {connectionStatus === 'disconnected' && '🔴 Disconnected'}
            {connectionStatus === 'error' && '🔴 Connection Error'}
          </span>
        </div>
        
        <div className="toolbar-section">
          <button 
            className={tool === 'pen' ? 'active' : ''} 
            onClick={() => setTool('pen')}
            title="Pen Tool (P)"
          >
            ✏️ Pen
          </button>
          <button 
            className={tool === 'eraser' ? 'active' : ''} 
            onClick={() => setTool('eraser')}
            title="Eraser (E)"
          >
            🧹 Eraser
          </button>
          <button 
            className={tool === 'line' ? 'active' : ''} 
            onClick={() => setTool('line')}
            title="Line Tool (L)"
          >
            ─ Line
          </button>
          <button 
            className={tool === 'arrow' ? 'active' : ''} 
            onClick={() => setTool('arrow')}
            title="Arrow Tool (A)"
          >
            → Arrow
          </button>
          <button 
            className={tool === 'rectangle' ? 'active' : ''} 
            onClick={() => setTool('rectangle')}
            title="Rectangle Tool (R)"
          >
            ▭ Rectangle
          </button>
          <button 
            className={tool === 'circle' ? 'active' : ''} 
            onClick={() => setTool('circle')}
            title="Circle Tool (C)"
          >
            ○ Circle
          </button>
          <button 
            className={tool === 'text' ? 'active' : ''} 
            onClick={() => setTool('text')}
            title="Text Tool (T)"
          >
            T Text
          </button>
          <button 
            className={tool === 'sticky' ? 'active' : ''} 
            onClick={() => setTool('sticky')}
            title="Sticky Note"
          >
            📝 Sticky
          </button>
        </div>

        <div className="toolbar-section">
          <div className="color-picker-group">
            <label>Stroke:</label>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              title="Stroke Color"
            />
          </div>
          <div className="color-picker-group">
            <label>Fill:</label>
            <input 
              type="color" 
              value={fillColor === 'transparent' ? '#ffffff' : fillColor} 
              onChange={(e) => setFillColor(e.target.value)}
              title="Fill Color"
            />
            <button 
              className={`fill-toggle ${fillColor === 'transparent' ? 'active' : ''}`}
              onClick={() => setFillColor(fillColor === 'transparent' ? '#ffffff' : 'transparent')}
              title="Toggle Fill"
            >
              {fillColor === 'transparent' ? '⊘' : '■'}
            </button>
          </div>
          
          <div className="stroke-width-control">
            <button 
              onClick={() => setShowStrokePanel(!showStrokePanel)}
              title="Stroke Width"
            >
              ⚫ {strokeWidth}px
            </button>
            {showStrokePanel && (
              <div className="stroke-panel">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                />
                <div className="stroke-presets">
                  {[1, 2, 4, 8, 12, 16].map(size => (
                    <button
                      key={size}
                      onClick={() => setStrokeWidth(size)}
                      className={strokeWidth === size ? 'active' : ''}
                    >
                      <div style={{ 
                        width: `${size * 2}px`, 
                        height: `${size * 2}px`, 
                        borderRadius: '50%', 
                        background: '#000' 
                      }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-section">
          <button onClick={undo} disabled={historyStep === 0} title="Undo (Ctrl+Z)">
            ↶ Undo
          </button>
          <button onClick={redo} disabled={historyStep >= history.length - 1} title="Redo (Ctrl+Y)">
            ↷ Redo
          </button>
          <button onClick={exportCanvas} title="Export as PNG (Ctrl+S)">
            💾 Export
          </button>
          <button onClick={clearCanvas} className="clear-btn" title="Clear Canvas">
            🗑️ Clear
          </button>
        </div>

        <div className="toolbar-section users-section">
          <button 
            onClick={() => setShowUsers(!showUsers)} 
            className="users-btn"
            title="View online users"
          >
            👥 Online: {users.length}
          </button>
          {showUsers && (
            <div className="users-dropdown">
              {users.map((user, idx) => (
                <div key={idx} className="user-item">
                  <span className="user-dot"></span>
                  {user.username}
                  {user.username === username && ' (You)'}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="toolbar-section">
          <button 
            onClick={() => setShowAbout(true)} 
            className="about-btn"
            title="About & Help"
          >
            ℹ️ About
          </button>
        </div>
      </div>

      <div className="canvas-container">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight - 80}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {shapes.map((shape, i) => renderShape(shape, i))}

            {Object.values(cursors).map((cursor) => (
              cursor.userId !== username && (
                <React.Fragment key={cursor.userId}>
                  <KonvaText
                    x={cursor.x + 10}
                    y={cursor.y - 20}
                    text={cursor.username}
                    fontSize={12}
                    fill="#6366f1"
                    fontStyle="bold"
                  />
                  <KonvaText
                    x={cursor.x}
                    y={cursor.y}
                    text="▲"
                    fontSize={16}
                    fill="#6366f1"
                  />
                </React.Fragment>
              )
            ))}
          </Layer>
        </Stage>
      </div>

      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAbout(false)}>×</button>
            
            <h2>🎨 CollabBoard</h2>
            <p className="modal-subtitle">Real-Time Collaborative Whiteboard</p>
            
            <div className="modal-section">
              <h3>✨ Features</h3>
              <ul>
                <li>🖊️ Multiple drawing tools (Pen, Eraser, Line, Arrow, Rectangle, Circle, Text)</li>
                <li>🎨 Customizable colors and stroke widths</li>
                <li>↶↷ Undo/Redo support</li>
                <li>👥 Real-time multi-user collaboration</li>
                <li>👁️ Live cursor tracking</li>
                <li>💾 Export to PNG</li>
                <li>⌨️ Keyboard shortcuts</li>
              </ul>
            </div>

            <div className="modal-section">
              <h3>⌨️ Keyboard Shortcuts</h3>
              <div className="shortcuts-grid">
                <div><kbd>P</kbd> Pen</div>
                <div><kbd>E</kbd> Eraser</div>
                <div><kbd>L</kbd> Line</div>
                <div><kbd>A</kbd> Arrow</div>
                <div><kbd>R</kbd> Rectangle</div>
                <div><kbd>C</kbd> Circle</div>
                <div><kbd>T</kbd> Text</div>
                <div><kbd>Ctrl+Z</kbd> Undo</div>
                <div><kbd>Ctrl+Y</kbd> Redo</div>
                <div><kbd>Ctrl+S</kbd> Export</div>
              </div>
            </div>

            <div className="modal-section">
              <h3>🛠️ Tech Stack</h3>
              <p>Built with React, Konva, Socket.io, and Express</p>
            </div>

            <div className="modal-section developer-section">
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
            </div>

            <div className="modal-footer">
              <p>Open Source • MIT License</p>
              <a href="https://github.com/YOUR_GITHUB_USERNAME/collab-whiteboard" target="_blank" rel="noopener noreferrer">
                ⭐ Star on GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="info-banner">
        <div className="info-content">
          <span className="shortcuts-info">
            💡 Shortcuts: P=Pen, E=Eraser, L=Line, A=Arrow, R=Rectangle, C=Circle, T=Text | Ctrl+Z=Undo, Ctrl+Y=Redo, Ctrl+S=Export
          </span>
          <span className="developer-info">
            Made with ❤️ by <a href="https://github.com/umang48" target="_blank" rel="noopener noreferrer">Umang Prajapati</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
