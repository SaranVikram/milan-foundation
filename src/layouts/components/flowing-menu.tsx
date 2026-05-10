import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import useWindow from "@/hooks/useWindow";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  isMobile: boolean;
  onItemClick: () => void;
}

interface FlowingMenuProps {
  items?: Omit<MenuItemProps, "isMobile" | "onItemClick">[];
  onItemClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image,isMobile, onItemClick  }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"top" | "bottom">("top");

 

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ev.currentTarget.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    setAnimationDirection(edge);
    setIsHovered(true);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ev.currentTarget.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    setAnimationDirection(edge);
    setIsHovered(false);
  };

  const handleClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      ev.preventDefault(); // stop immediate navigation
      const href = ev.currentTarget.href; // store now before setTimeout
      const rect = ev.currentTarget.getBoundingClientRect();
      const edge = findClosestEdge(
        ev.clientX - rect.left,
        ev.clientY - rect.top,
        rect.width,
        rect.height
      );
      setAnimationDirection(edge);
      setIsHovered(true);

      // navigate after animation (600ms)
      setTimeout(() => {
        onItemClick();
        router.push(href);
      }, 600);
    }
  };

  const singleMarqueeSet = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="
          text-slate-900 dark:text-white
          uppercase font-bold text-[2rem] md:text-[5vh] leading-[1.2] px-8 whitespace-nowrap"
        >
          {text}
        </span>
      </React.Fragment>
    ));
  }, [text]);

  return (
    <div
      className="
        flex-1 relative overflow-hidden text-center
        shadow-[0_-1px_0_0_rgba(255,255,255,0.2)]
        dark:shadow-[0_-1px_0_0_rgba(0,0,0,0.2)]
      "
    >
      <a
        className="
          flex items-center justify-center h-full relative cursor-pointer
          uppercase no-underline font-bold
          text-slate-600 dark:text-slate-400
          text-[1.5rem] md:text-[3vh]
          hover:text-slate-900 dark:hover:text-white
          transition-colors duration-300
        "
        href={link}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            className="
              absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none
              bg-slate-50 dark:bg-slate-800"
            initial={{ y: animationDirection === "top" ? "-101%" : "101%" }}
            animate={{ y: "0%" }}
            exit={{ y: animationDirection === "top" ? "-101%" : "101%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="h-full w-full flex"
              initial={{ y: animationDirection === "top" ? "101%" : "-101%" }}
              animate={{ y: "0%" }}
              exit={{ y: animationDirection === "top" ? "101%" : "-101%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center relative h-full w-max animate-marquee will-change-transform">
                <div className="flex items-center shrink-0">{singleMarqueeSet}</div>
                <div className="flex items-center shrink-0">{singleMarqueeSet}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
        </LazyMotion>
    </div>
  );
};

export const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], onItemClick}) => {
   // ✅ use your hook to get live window width
  const windowWidth = useWindow();
  const isMobile = windowWidth < 768;
  return (
    <div className="
      w-full h-full overflow-hidden
      bg-white dark:bg-slate-900
      transition-colors duration-300
      "
    >
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} isMobile={isMobile} onItemClick={onItemClick}/>
        ))}
      </nav>
    </div>
  );
};