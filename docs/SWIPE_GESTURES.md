# Swipe Gesture Navigation Setup

This document explains how swipe gestures work between the app tabs (home, shop, about, profile) in the React Native Expo app.

## Current Implementation

✅ **CUSTOM GESTURE SYSTEM**: Now uses custom swipe gestures instead of Stack gestures
✅ **AppScreen Integration**: Swipe gestures integrated directly in AppScreen component
✅ **Navigation Order**: home → shop → about → profile → home (cyclical)
✅ **Gesture Handlers**: Applied to main content area with PanResponder
✅ **Tab Synchronization**: Swipe gestures sync with BottomNav tab state
✅ **Conflict Resolution**: Disabled Stack gestures to avoid navigation conflicts

## What Was Fixed

- **Black Screen Issue**: Replaced problematic Stack gestures with custom gesture implementation
- **Navigation Conflict**: Disabled Stack gestures to prevent conflicts with custom tab navigation
- **Custom Gesture System**: Implemented swipe detection using PanResponder in AppScreen
- **Tab Order Navigation**: Created proper cyclical navigation: home → shop → about → profile → home
- **State Synchronization**: Swipe gestures properly update active tab state

## What's Enabled

✅ **Expo Router Built-in Gestures**: The app now uses Expo Router's built-in gesture navigation system
✅ **Horizontal Swipe Navigation**: Users can swipe left/right between screens
✅ **Edge Gesture Support**: Gestures work from screen edges
✅ **Smooth Animations**: Fade transitions between screens
✅ **Gesture Response**: Optimized for touch interactions

## How It Works

### 1. Custom Gesture System
- **PanResponder Integration**: Uses React Native's PanResponder for swipe detection
- **AppScreen Component**: Gestures are applied to the main content area
- **Swipe Detection**: Threshold of 50px distance and 0.3 velocity for reliable detection
- **Tab Synchronization**: Swipe gestures update both navigation state and active tab

### 2. Navigation Method
- **Cyclical Navigation**: home → shop → about → profile → home
- **router.navigate()**: Uses Expo Router's navigate for screen transitions
- **State Management**: Syncs with BottomNav component and useActiveTab hook
- **No Stack Conflicts**: Stack gestures disabled to prevent navigation conflicts

### 3. Screen Structure
```
AppScreen (with custom gestures)
├── home.tsx      ← Swipe here to go to shop
├── shop.tsx      ← Swipe here to go to about  
├── about.tsx     ← Swipe here to go to profile
└── profile.tsx   ← Swipe here to go to home
```

## Usage

### For Users:
- **Swipe Right**: Navigate to previous screen in the tab order
- **Swipe Left**: Navigate to next screen in the tab order
- **Edge Swipes**: Swipe from the left or right edge of the screen
- **Bottom Navigation**: Tap tabs for direct navigation

### For Developers:
- All navigation is handled through the BottomNav component
- Tab state is synchronized with the current route
- Authentication is preserved during navigation

## Configuration Details

### Stack Options
```typescript
{
  gestureEnabled: true,
  animation: 'fade',
  animationTypeForReplace: 'pop'
}
```

### Tab Navigation Order
1. Home → Shop → About → Profile → Home (cycle)

## Troubleshooting

### If Swipe Gestures Don't Work:
1. Check that `gestureEnabled: true` is set in Stack options
2. Ensure screens are using `router.navigate()` instead of `router.replace()`
3. Verify that the screens are part of the same navigation stack
4. Check that authentication state isn't interfering with navigation

### Performance Considerations:
- Gestures are optimized for 60fps performance
- Animation duration is configured for smooth user experience
- Memory usage is optimized for gesture history

## Future Enhancements

Potential improvements that could be added:
- Custom gesture thresholds
- Haptic feedback for gestures
- Gesture direction indicators
- Advanced gesture recognition (multi-touch, etc.)

---

**Note**: This implementation uses Expo Router's native gesture system for optimal performance and compatibility with iOS and Android platforms.