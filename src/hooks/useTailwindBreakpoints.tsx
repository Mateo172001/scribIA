import { useState, useEffect } from "react";

function useTailwindBreakpoints() {
  const [breakpoint, setBreakpoint] = useState<
    "sm" | "md" | "lg" | "xl" | "2xl" | null
  >(null);

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      return width < 640
        ? "sm"
        : width < 768
        ? "md"
        : width < 1024
        ? "lg"
        : width < 1280
        ? "xl"
        : "2xl";
    };

    const handleResize = () => setBreakpoint(getBreakpoint());

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = breakpoint === "sm" || breakpoint === "md";
  const isTablet = breakpoint === "lg";
  const isDesktop = breakpoint === "xl" || breakpoint === "2xl";

  return { breakpoint, isMobile, isTablet, isDesktop };
}

export { useTailwindBreakpoints };
