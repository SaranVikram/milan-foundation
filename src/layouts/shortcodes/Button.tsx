import Link from "next/link";
import React from "react";

interface ButtonProps {
  label: string | React.ReactNode;
  link?: string;
  style?: string;
  rel?: string;
  onClick?: () => void;
  className?: string; // ✅ allow custom classes
}

const ButtonComponent = ({
  label,
  link,
  style,
  rel,
  onClick,
  className = "", // ✅ default empty string
}: ButtonProps) => {
  const baseClasses = `btn no-underline ${
    style === "outline" ? "btn-outline-primary" : "btn-primary"
  }`;

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`${baseClasses} ${className}`} // ✅ merge custom classes
        data-label={label}
      >
        {label}
      </button>
    );
  }

  // Otherwise render as Link
  return (
    <Link
      href={link || "#"}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`${baseClasses} ${className}`} // ✅ merge custom classes
      data-label={label}
    >
      {label}
    </Link>
  );
};

export default ButtonComponent;
