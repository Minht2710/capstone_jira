import React, { useEffect, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWidowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWidowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWidowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;
  const isTablet = width <= 1024;
  const isDesktop = width > 1024;
  return { isDesktop, isMobile, isTablet };
};

export default useResponsive;
