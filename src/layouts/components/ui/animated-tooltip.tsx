
"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Briefcase, Car, Cpu, CircuitBoard, Users, BrainCircuit } from "lucide-react"; // Import Users and BrainCircuit
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";

export interface IndustryItem {
  id: number;
  name: string;
  description: string;
  icon: string;
  sectors: string[];
}

export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: IndustryItem[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-5, 5]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-5, 5]),
    springConfig
  );

  useEffect(() => {
    console.log("AnimatedTooltip mounted with", items.length, "items");
    setMounted(true);
  }, [items.length]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "briefcase-it":
        // Matches "IT Staffing" icon string
        return <Briefcase className="h-6 w-6 text-blue-500" />;
      case "users-group":
        // Matches "Non-IT Staffing" icon string
        return <Briefcase className="h-6 w-6 text-green-500" />;
      case "microchip":
        // Matches "Semiconductor" icon string
        return <CircuitBoard className="h-6 w-6 text-purple-500" />;
      case "brain-circuit":
        // Matches "Artificial Intelligence" icon string
        return <Cpu className="h-6 w-6 text-red-500" />;
      case "car-side":
        // Matches "Automobile" icon string
        return <Car className="h-6 w-6 text-yellow-500" />;
      default:
        return <Briefcase className="h-6 w-6" />;
    }
  };

  if (!mounted || items.length === 0) {
    return <div className="p-8 text-center">Loading industries data...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className={cn("flex flex-wrap items-center justify-center gap-6 mb-8", className)}>
        {items.map((item, index) => (
          <div
            className="relative cursor-pointer"
            key={item.id}
            onClick={() => setActiveIndex(index)}
          >
            <motion.div 
              className={`rounded-full p-4 bg-white border-2 ${
                activeIndex === index 
                  ? "border-primary shadow-lg text-primary" 
                  : "border-gray-200 text-gray-500"
              } transition-all duration-300 hover:scale-110 hover:shadow-md`}
              whileHover={{ y: -5 }}
              onMouseMove={handleMouseMove}
            >
              {renderIcon(item.icon)}
            </motion.div>
            {activeIndex === index && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary rounded-full -mb-1"
                layoutId="activeIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateX(-50%)" }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 260, damping: 20 }
          }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          style={{
            translateX: translateX,
            rotate: rotate,
          }}
          className="w-full max-w-lg mx-auto"
              >

          <Card className="shadow-lg relative overflow-hidden p-2">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                {renderIcon(items[activeIndex].icon)}
                {items[activeIndex].name}
              </CardTitle>
              <CardDescription>
                {items[activeIndex].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium text-sm mb-2">Expertise in sectors:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {items[activeIndex].sectors.map((sector, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <span className="mr-2 text-primary">•</span>
                    {sector}
                  </li>
                ))}
              </ul>
                      </CardContent>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-violet-500"></div>
                  </Card>
                  

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
