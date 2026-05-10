import { useEffect, useState } from "react";

const useWindow = (size = 768) => {
  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined"
      ? Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      : size // Use default size for initial server render
  );

  useEffect(() => {
    // Only execute the effect if we are on the client side
    if (typeof window !== "undefined") {
      const viewport = () => {
        const width = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        setWindowSize(width);
      };

      window.addEventListener("resize", viewport);
      
      // Run once to set initial width
      viewport();

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", viewport);
    }
  }, []);

  return windowSize;
};

export default useWindow;
