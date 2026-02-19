# Changelog

All notable changes to the Collaborative Whiteboard project are documented here.

## [2.0.0] - 2024-02-19

### 🎉 Major Release - Complete Rewrite

This release represents a complete overhaul of the drawing system with numerous bug fixes and feature additions.

### ✅ Fixed

#### Critical Bug Fixes
- **Eraser Tool**: Fixed eraser functionality - now properly erases drawings using `destination-out` composite operation
- **Undo/Redo**: Completely rebuilt history system - undo and redo now work correctly with proper state management
- **Multi-User Count**: Fixed user count display - now correctly shows all connected users in real-time
- **User List Sync**: Fixed user list broadcasting to ensure all clients receive updates when users join/leave
- **Canvas State Persistence**: New users now see existing drawings when they join
- **Deprecated API**: Replaced `onKeyPress` with `onKeyDown` to fix React warnings

#### Minor Fixes
- Fixed connection status not updating properly
- Fixed shapes not syncing correctly across clients
- Fixed history being lost on new drawings
- Fixed stroke width not applying to eraser

### 🎨 Added

#### New Drawing Tools (5 New Tools!)
- **Line Tool (L)**: Draw perfectly straight lines between two points
- **Arrow Tool (A)**: Draw arrows with pointer heads for diagrams and annotations
- **Circle Tool (C)**: Draw circles from center outward with fill support
- **Text Tool (T)**: Add draggable text annotations anywhere on canvas
- **Enhanced Rectangle**: Added fill color support to existing rectangle tool

#### Customization Features
- **Stroke Width Control**: Adjustable line thickness from 1px to 20px
  - Interactive slider for precise control
  - Quick preset buttons (1, 2, 4, 8, 12, 16 pixels)
  - Visual size preview
  - Dropdown panel with smooth animations
- **Fill Color System**: Independent fill and stroke color controls
  - Separate color pickers for stroke and fill
  - Fill toggle button (⊘/■) for quick enable/disable
  - Works with Rectangle and Circle tools
  - Default transparent fill
- **Color Picker Groups**: Organized UI with labeled stroke and fill pickers

#### Keyboard Shortcuts
- **P** - Switch to Pen tool
- **E** - Switch to Eraser tool
- **L** - Switch to Line tool
- **A** - Switch to Arrow tool
- **R** - Switch to Rectangle tool
- **C** - Switch to Circle tool
- **T** - Switch to Text tool
- **Ctrl+Z** (Cmd+Z) - Undo last action
- **Ctrl+Y** (Cmd+Y) - Redo last undone action
- **Ctrl+S** (Cmd+S) - Export canvas as PNG

#### UI Enhancements
- **Connection Status Indicator**: Real-time connection status with color coding
  - 🟢 Green - Connected
  - 🟡 Yellow - Connecting
  - 🔴 Red - Disconnected/Error
- **Interactive User List**: Click to expand dropdown showing all online users
  - Green pulsing dot for active users
  - "(You)" indicator for current user
  - Smooth dropdown animation
- **Improved Toolbar Layout**: Better organization with logical grouping
  - Section 1: Branding + User info + Status
  - Section 2: Drawing tools
  - Section 3: Customization (colors, stroke)
  - Section 4: Actions (undo/redo/export/clear)
  - Section 5: User management
- **Enhanced Info Banner**: Updated with keyboard shortcut hints

#### Real-Time Features
- **Synchronized Clear**: Clear canvas action now syncs to all connected users
- **Canvas State Sync**: New users receive complete canvas state on join
- **Improved Cursor Tracking**: Better performance and visual feedback
- **Shape Broadcasting**: All new shape types sync in real-time

#### Documentation
- **NEW_FEATURES.md**: Comprehensive guide to all new features
- **TESTING_GUIDE.md**: Updated with testing instructions for new features
- **CHANGELOG.md**: This file - complete change history

### 🔄 Changed

#### Architecture Improvements
- **Unified Shape System**: Replaced separate arrays (lines, rectangles, stickyNotes) with single `shapes` array
  - Better performance
  - Simpler state management
  - Easier to add new shape types
  - Reduced memory footprint
- **History System Rewrite**: Complete rebuild of undo/redo functionality
  - Array-based history with step pointer
  - Proper state snapshots
  - Forward history clearing on new actions
  - Unlimited history depth
- **Server State Management**: Simplified canvas state storage
  - Single `shapes` array instead of multiple type-specific arrays
  - Cleaner broadcast logic
  - Reduced network payload

#### Code Quality
- **Component Refactoring**: Cleaner, more maintainable code structure
- **Shape Rendering**: Centralized `renderShape()` function for all shape types
- **Event Handling**: Improved mouse event handlers with better state management
- **Type Safety**: Better shape type definitions and handling

#### UI/UX Improvements
- **Responsive Toolbar**: Better wrapping and spacing on smaller screens
- **Button States**: Proper disabled states with visual feedback
- **Hover Effects**: Consistent hover animations across all buttons
- **Active Tool Indication**: Clear visual feedback for selected tool
- **Color Picker Styling**: Improved visual design with labels and grouping

### 🚀 Performance

- **Faster Rendering**: Unified shape system reduces render complexity
- **Optimized History**: Only stores shape data, not full canvas snapshots
- **Better Memory Usage**: Single array instead of multiple type-specific arrays
- **Reduced Network Traffic**: Simplified shape structure for smaller payloads
- **Efficient State Updates**: Proper React state management prevents unnecessary re-renders

### 📦 Dependencies

No new dependencies added. Still using:
- React 18.3.1
- Konva & React-Konva 18.2.10
- Socket.io-client 4.8.1
- Express 4.21.2
- Socket.io 4.8.1

### 🔧 Technical Details

#### Shape Structure
```javascript
{
  type: 'line' | 'rectangle' | 'circle' | 'arrow' | 'text' | 'sticky',
  stroke: string,           // Hex color
  strokeWidth: number,      // 1-20px
  fill: string,            // Hex color or 'transparent'
  // ... type-specific properties
}
```

#### History System
- Array of canvas states: `[state0, state1, state2, ...]`
- Current position tracked with `historyStep`
- Undo: Move step back, restore previous state
- Redo: Move step forward, restore next state
- New action: Truncate forward history, add new state

#### Server Events
- `join` - User joins with username
- `draw` - Shape created/completed
- `cursor-move` - Real-time cursor position
- `clear-canvas` - Clear all shapes
- `initial-state` - Send canvas state to new user
- `users` - Broadcast user list update

### 🐛 Known Issues

None currently. All major issues from v1.0.0 have been resolved.

### 🔮 Future Enhancements

Planned features for future releases:
- Shape selection and manipulation
- Delete individual shapes
- Shape rotation and scaling
- Copy/paste functionality
- Layers system
- Background grid option
- Zoom and pan controls
- More shape types (triangle, star, polygon)
- Text editing after placement
- Shape grouping
- Alignment and distribution tools
- Color palette presets
- Export to SVG format
- Import images
- Collaborative shape locking
- Chat functionality
- Drawing permissions/roles

---

## [1.0.0] - 2024-02-18

### Initial Release

#### Features
- Basic pen drawing tool
- Rectangle tool
- Sticky notes
- Eraser tool (non-functional)
- Color picker
- Clear canvas
- Real-time collaboration
- User cursor tracking
- Socket.io integration
- Basic toolbar UI

#### Known Issues
- Eraser tool doesn't work
- Undo/redo buttons don't work
- User count shows only 1 user
- No stroke width control
- No fill color option
- Limited drawing tools
- No keyboard shortcuts

---

## Version Format

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Categories

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Vulnerability fixes
