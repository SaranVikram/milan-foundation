"use client"; // Ensures this is a Client Component

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { HamburgerMenu } from './hamburger-menu';
import Logo from './Logo';
import Link from 'next/link';
import ButtonComponent from "@/shortcodes/Button";
import config from "@/config/config.json";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    };
  };
  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <nav className={`transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-2' : 'py-4 border-b border-slate-100'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Item 1: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ButtonComponent label="Donate Now" link="/donate" style="primary" />
            </div>
            <div className="text-slate-900">
              <HamburgerMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
