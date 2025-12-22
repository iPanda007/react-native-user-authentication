import { useRef, useCallback } from 'react';
import { GestureResponderEvent, PanResponder } from 'react-native';

interface TabSwipeGestureOptions {
  threshold?: number;
  velocityThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
  blockHorizontalOnVerticalScroll?: boolean;
}

interface LegacySwipeGestureOptions extends TabSwipeGestureOptions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useTabSwipeGesture({
  threshold = 50,
  velocityThreshold = 0.3,
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
  blockHorizontalOnVerticalScroll = true,
}: TabSwipeGestureOptions) {
  const lastTap = useRef<number>(0);
  const gestureStartTime = useRef<number>(0);
  const gestureStartPos = useRef<{ x: number; y: number } | null>(null);
  const gestureExecuted = useRef<boolean>(false);
  const lastGestureDirection = useRef<'left' | 'right' | null>(null);
  const isVerticalGesture = useRef<boolean>(false);
  const navigationAttempts = useRef<number>(0);
  const lastNavigationAttempt = useRef<number>(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        gestureExecuted.current = false;
        lastGestureDirection.current = null;
        isVerticalGesture.current = false;
        
        const { moveX, moveY } = gestureState as any;
        gestureStartPos.current = { x: moveX, y: moveY };
        
        return enabled && Math.abs(gestureState.dx) > 8;
      },
      
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!enabled || gestureExecuted.current) return false;
        
        const { dx, dy } = gestureState as any;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        
        if (blockHorizontalOnVerticalScroll) {
          const isVerticalMovement = absDy > absDx * 1.5 && absDy > 20;
          
          if (isVerticalMovement) {
            isVerticalGesture.current = true;
            return false;
          }
          
          const isStrongHorizontal = absDx > absDy * 2.0 && absDx > 25;
          const hasSignificantMovement = absDx > 20 || absDy > 20;
          
          return enabled && isStrongHorizontal && hasSignificantMovement && !isVerticalGesture.current;
        } else {
          const hasHorizontalMovement = absDx > 15;
          const isPrimarilyHorizontal = absDx >= absDy * 1.3;
          
          return enabled && hasHorizontalMovement && isPrimarilyHorizontal && !gestureExecuted.current;
        }
      },
      
      onPanResponderGrant: () => {
        gestureStartTime.current = Date.now();
      },
      
      onPanResponderMove: (_, gestureState) => {
        if (!enabled) return;
        
        const { dx, dy } = gestureState as any;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        
        if (blockHorizontalOnVerticalScroll && absDy > absDx * 2 && absDy > 30) {
          isVerticalGesture.current = true;
        }
        
        if (!isVerticalGesture.current && !gestureExecuted.current && absDx > threshold * 0.7) {
          lastGestureDirection.current = dx > 0 ? 'right' : 'left';
        }
      },
      
      onPanResponderRelease: (_, gestureState) => {
        if (!enabled || gestureExecuted.current) return;
        
        const { dx, dy, vx, vy } = gestureState as any;
        const gestureDuration = Date.now() - gestureStartTime.current;
        const now = Date.now();
        
        const horizontalDistance = Math.abs(dx);
        const verticalDistance = Math.abs(dy);
        const horizontalVelocity = Math.abs(vx);
        const verticalVelocity = Math.abs(vy);
        
        if (now - lastNavigationAttempt.current < 1000) {
          navigationAttempts.current++;
          if (navigationAttempts.current > 3) {
            return;
          }
        } else {
          navigationAttempts.current = 0;
        }
        lastNavigationAttempt.current = now;
        
        if (isVerticalGesture.current) {
          return;
        }
        
        let isValidHorizontalGesture = false;
        
        if (blockHorizontalOnVerticalScroll) {
          isValidHorizontalGesture = 
            horizontalDistance > threshold && 
            horizontalVelocity > velocityThreshold &&
            horizontalDistance > verticalDistance * 2.5 &&
            horizontalDistance > 50 &&
            !isVerticalGesture.current;
        } else {
          isValidHorizontalGesture = 
            horizontalDistance > threshold && 
            horizontalVelocity > velocityThreshold &&
            (horizontalDistance > verticalDistance * 1.3 || verticalDistance < 25);
        }
        
        const isQuickGesture = gestureDuration < 450;
        const direction = dx > 0 ? 'right' : 'left';
        
        if ((isValidHorizontalGesture || (isQuickGesture && horizontalDistance > threshold * 0.9))) {
          gestureExecuted.current = true;
          
          console.log(`Swipe ${direction} detected - horizontal: ${horizontalDistance.toFixed(1)}px, vertical: ${verticalDistance.toFixed(1)}px, duration: ${gestureDuration}ms, attempts: ${navigationAttempts.current}`);
          
          if (direction === 'right') {
            if (onSwipeRight && lastGestureDirection.current === 'right' && !isVerticalGesture.current) {
              onSwipeRight();
            }
          } else {
            if (onSwipeLeft && lastGestureDirection.current === 'left' && !isVerticalGesture.current) {
              onSwipeLeft();
            }
          }
        }
        
        setTimeout(() => {
          gestureExecuted.current = false;
          gestureStartPos.current = null;
          lastGestureDirection.current = null;
          isVerticalGesture.current = false;
          navigationAttempts.current = 0;
        }, 300);
      },
      
      onPanResponderTerminate: () => {
        gestureExecuted.current = false;
        gestureStartPos.current = null;
        lastGestureDirection.current = null;
        isVerticalGesture.current = false;
        navigationAttempts.current = 0;
      },
      
      onPanResponderReject: () => {
        gestureExecuted.current = false;
        gestureStartPos.current = null;
        lastGestureDirection.current = null;
        isVerticalGesture.current = false;
        navigationAttempts.current = 0;
      },
    })
  ).current;

  const handleTouchStart = useCallback((event: GestureResponderEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap.current;
    
    if (tapLength > 500) {
      lastTap.current = 0;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      lastGestureDirection.current = null;
      isVerticalGesture.current = false;
      navigationAttempts.current = 0;
    }, 150);
  }, []);

  return {
    panHandlers: panResponder.panHandlers,
    handleTouchStart,
    handleTouchEnd,
    isEnabled: enabled,
  };
}

export function useSwipeGesture(options: LegacySwipeGestureOptions) {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    ...rest
  } = options;

  const tabGesture = useTabSwipeGesture({
    threshold,
    velocityThreshold,
    onSwipeLeft,
    onSwipeRight,
    ...rest,
  });

  return {
    ...tabGesture,
    panHandlers: tabGesture.panHandlers,
    handleTouchStart: tabGesture.handleTouchStart,
  };
}