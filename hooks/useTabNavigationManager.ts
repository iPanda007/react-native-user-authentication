// hooks/useTabNavigationManager.ts
import { useCallback, useMemo, useRef } from "react";
import { useRouter, useSegments } from "expo-router";
import { Platform } from "react-native";

type RouteName = "home" | "shop" | "about" | "profile";

export function useTabNavigationManager() {
  const router = useRouter();
  const segments = useSegments();

  const navigationLock = useRef(false);
  const lastNavigationTime = useRef(0);

  // DIRECT route order
  const tabOrder: RouteName[] = ["home", "shop", "about", "profile"];

  // Swipe map
  const swipeLeftMap: Record<RouteName, RouteName> = {
    home: "shop",
    shop: "about",
    about: "profile",
    profile: "home",
  };

  const swipeRightMap: Record<RouteName, RouteName> = {
    home: "profile",
    shop: "home",
    about: "shop",
    profile: "about",
  };

  const currentRoute = (segments[1] as RouteName) || "home";
  const currentIndex = tabOrder.indexOf(currentRoute);

  const debouncedNavigation = useCallback((fn: () => void, delay = 350) => {
    const now = Date.now();
    if (navigationLock.current || now - lastNavigationTime.current < delay) {
      console.log("Navigation blocked (debounce)");
      return;
    }

    navigationLock.current = true;
    lastNavigationTime.current = now;

    fn();

    setTimeout(() => {
      navigationLock.current = false;
    }, delay);
  }, []);

  const navigateToNextTab = useCallback(() => {
    const next = swipeLeftMap[currentRoute];
    debouncedNavigation(() => {
      console.log(`Navigate: ${currentRoute} -> ${next}`);
      router.push(`/${next}`);
    });
  }, [currentRoute, router, debouncedNavigation]);

  const navigateToPreviousTab = useCallback(() => {
    const prev = swipeRightMap[currentRoute];
    debouncedNavigation(() => {
      console.log(`Navigate: ${currentRoute} -> ${prev}`);
      router.push(`/${prev}`);
    });
  }, [currentRoute, router, debouncedNavigation]);

  return {
    currentRoute,
    currentIndex,

    navigateToNextTab,
    navigateToPreviousTab,

    gestureConfig: {
      threshold: Platform.OS === "ios" ? 50 : 70,
    },
  };
}
