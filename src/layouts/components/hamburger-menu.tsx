import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowingMenu } from "./flowing-menu";

const menuItems = [
  { link: '/', text: 'Home', image: '/images/placeholder-project.png' },
  { link: '/about-us', text: 'About Us', image: '/images/placeholder-project.png' },
  { link: '/programs', text: 'Programs', image: '/images/placeholder-project.png' },
  { link: '/gallery', text: 'Gallery', image: '/images/placeholder-project.png' },
  { link: '/get-involved', text: 'Get Involved', image: '/images/placeholder-project.png' },
  { link: '/contact', text: 'Contact', image: '/images/placeholder-project.png' }
];

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Add marquee animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marqueeScroll {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .animate-marquee {
        animation: marqueeScroll 25s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: 45,
      y: 6,
    }
  };

  const hamburgerMiddleVariants = {
    closed: {
      opacity: 1,
    },
    open: {
      opacity: 0,
    }
  };

  const hamburgerBottomVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: -45,
      y: -6,
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        className={`
           z-[60] w-12 h-12 rounded-xl
          flex flex-col items-center justify-center gap-1.5
          transition-all duration-300 ease-in-out
          ${isOpen
            ? 'bg-slate-900 text-white shadow-xl'
            : 'bg-slate-50 hover:bg-slate-100 shadow-sm border border-slate-200'
          }
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className={`
            w-6 h-0.5 transition-colors duration-300
            ${isOpen ? 'bg-white' : 'bg-slate-900'}
          `}
          variants={hamburgerVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`
            w-6 h-0.5 transition-colors duration-300
            ${isOpen ? 'bg-white' : 'bg-slate-900'}
          `}
          variants={hamburgerMiddleVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`
            w-6 h-0.5 transition-colors duration-300
            ${isOpen ? 'bg-white' : 'bg-slate-900'}
          `}
          variants={hamburgerBottomVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 z-40  bg-black/20 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsOpen(false);
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute inset-y-0 right-0 z-50 w-full max-w-md pointer-events-auto shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-full h-full border-l border-slate-100">
                <FlowingMenu items={menuItems} onItemClick={() => setIsOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};