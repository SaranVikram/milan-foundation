import React from "react";

interface SectionHeadingProps {
  text: string;
  className?: string;
  color?: {
    name: string; // optional, for reference
    hex: string;  // actual color value
  };
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ text, className = "", color }) => {
  const words = text.trim().split(" ");
  const lastWord = words[words.length - 1];
  const headingColor = color?.hex || "#000"; // fallback to black

  return (
    <div className={`relative w-full text-center ${className}`}>
      {/* Outlined background text - last word only */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span 
          className="font-urbanist font-black text-transparent opacity-10
                     text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[240px]
                     leading-none tracking-tight"
          style={{
            WebkitTextStroke: `2px ${headingColor}`,
          }}
        >
          {lastWord}
        </span>
      </div>

      {/* Main heading text */}
      <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <h2 
          className="font-urbanist font-bold
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                     leading-tight tracking-tight"
          style={{ color: headingColor }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
};
