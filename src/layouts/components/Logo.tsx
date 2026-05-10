"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import config from "@/config/config.json";

const Logo = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { logo, logo_width, logo_height } = config.site;
  const logoSrc = logo;
  const logoWidth = isSmallScreen ? 120 : parseInt(logo_width);
  const logoHeight = isSmallScreen ? 60 : parseInt(logo_height);
  const maxWidth = isSmallScreen ? "120px" : `${logo_width}px`;

  return (
    <Link href="/" className="navbar-brand inline-block">
      <Image
        src={logoSrc}
        alt="Logo"
        width={logoWidth}
        height={logoHeight}
        priority
        style={{
          width: "100%",
          height: "auto",
          maxWidth, // Adjust as needed
        }}
      />
    </Link>
  );
};

export default Logo;
