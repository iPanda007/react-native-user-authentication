# Swipe Gesture Navigation Setup

This document explains how swipe gestures work between the app tabs (home, shop, about, profile) in the React Native Expo app.

## What's Enabled

✅ **Expo Router Built-in Gestures**: The app now uses Expo Router's built-in gesture navigation system
✅ **Horizontal Swipe Navigation**: Users can swipe left/right between screens
✅ **Edge Gesture Support**: Gestures work from screen edges
✅ **Smooth Animations**: Fade transitions between screens
✅ **Gesture Response**: Optimized for touch interactions

## How It Works

### 1. Stack Configuration
- `gestureEnabled: true` - Enables all gesture navigation
- `animation: 'fade'` - Smooth fade transitions
- `animationTypeForReplace: 'pop'` - Proper screen replacement behavior

### 2. Navigation Method
- Uses `router.navigate()` for cross-screen navigation
- Maintains navigation stack for gesture history
- Preserves back navigation behavior

### 3. Screen Structure
```
(app)/
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