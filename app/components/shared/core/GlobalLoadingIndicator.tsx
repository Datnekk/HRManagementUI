import {
  completeNavigationProgress,
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { useEffect } from "react";
import { useNavigation } from "react-router";

export const GlobalLoadingIndicator = () => {
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!isNavigating) {
      timeout = setTimeout(() => {
        completeNavigationProgress();
      }, 300);
    } else {
      resetNavigationProgress();
      startNavigationProgress();
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isNavigating]);

  return <NavigationProgress stepInterval={100} />;
};
