import { useEffect, useRef } from 'react';
import { GestureResponderEvent, PanResponder } from 'react-native';
import { useRouter } from 'expo-router';

interface SwipeGestureOptions {
  threshold?: number; // Minimum distance for a swipe
  velocityThreshold?: number; // Minimum velocity for a swipe
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

/**
 * Custom hook for detecting swipe gestures
 * Integrates with Expo Router for navigation
 */
export function useSwipeGesture({
  threshold = 50,
  velocityThreshold = 0.3,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: SwipeGestureOptions) {
  const router = useRouter();
  const lastTap = useRef<number>(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only recognize gestures with significant movement
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy, vx, vy } = gestureState;
        
        // Calculate swipe distance and velocity
        const horizontalDistance = Math.abs(dx);
        const verticalDistance = Math.abs(dy);
        const horizontalVelocity = Math.abs(vx);
        const verticalVelocity = Math.abs(vy);

        // Check if it's a horizontal swipe (left or right)
        if (horizontalDistance > threshold && horizontalVelocity > velocityThreshold) {
          if (dx > 0) {
            // Swipe right
            if (onSwipeRight) {
              onSwipeRight();
            }
          } else {
            // Swipe left
            if (onSwipeLeft) {
              onSwipeLeft();
            }
          }
        }
        // Check if it's a vertical swipe (up or down)
        else if (verticalDistance > threshold && verticalVelocity > velocityThreshold) {
          if (dy > 0) {
            // Swipe down
            if (onSwipeDown) {
              onSwipeDown();
            }
          } else {
            // Swipe up
            if (onSwipeUp) {
              onSwipeUp();
            }
          }
        }
      },
    })
  ).current;

  // Double tap detection for additional functionality
  const handleTouchStart = (event: GestureResponderEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap.current;
    
    if (tapLength < 500 && tapLength > 0) {
      // Double tap detected - could be used for refresh or other actions
      console.log('Double tap detected');
    }
    
    lastTap.current = currentTime;
  };

  return {
    panHandlers: panResponder.panHandlers,
    handleTouchStart,
  };
}