import { useRouter } from 'expo-router';


export function useTabNavigation() {
  const router = useRouter();

  const tabs = ['/home', '/shop', '/about', '/profile'] as const;
  
  const getCurrentTabIndex = (currentPath: string): number => {
    return tabs.indexOf(currentPath as typeof tabs[number]);
  };

  const navigateToTab = (tabPath: '/home' | '/shop' | '/about' | '/profile') => {
    router.push(tabPath);
  };

  const navigateToNextTab = (currentPath: string) => {
    const currentIndex = getCurrentTabIndex(currentPath);
    const nextIndex = (currentIndex + 1) % tabs.length;
    router.push(tabs[nextIndex]);
  };

  const navigateToPreviousTab = (currentPath: string) => {
    const currentIndex = getCurrentTabIndex(currentPath);
    const previousIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    router.push(tabs[previousIndex]);
  };

  return {
    tabs,
    navigateToTab,
    navigateToNextTab,
    navigateToPreviousTab,
    getCurrentTabIndex,
  };
}