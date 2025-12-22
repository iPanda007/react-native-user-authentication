// components/SwipeWrapper.tsx
import { PanGestureHandler } from "react-native-gesture-handler";
import { View } from "react-native";
import { useRef } from "react";
import { useTabNavigationManager } from "../hooks/useTabNavigationManager";

export default function SwipeWrapper({ children }: { children: React.ReactNode }) {
  const { navigateToNextTab, navigateToPreviousTab, currentRoute, gestureConfig } =
    useTabNavigationManager();

  const startRoute = useRef<string | null>(null);

  const onBegan = () => {
    startRoute.current = currentRoute;
  };

  const onEnd = (event: any) => {
    const { translationX } = event.nativeEvent;

    if (Math.abs(translationX) < gestureConfig.threshold) return;

    if (translationX > 0) {
      console.log("Swipe RIGHT from:", startRoute.current);
      navigateToPreviousTab();
      return;
    }

    if (translationX < 0) {
      console.log("Swipe LEFT from:", startRoute.current);
      navigateToNextTab();
      return;
    }
  };

  return (
    <PanGestureHandler onBegan={onBegan} onEnded={onEnd}>
      <View style={{ flex: 1 }}>{children}</View>
    </PanGestureHandler>
  );
}
