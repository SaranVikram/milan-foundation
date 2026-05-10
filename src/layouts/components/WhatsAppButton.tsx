"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  // Using a placeholder number for now
  const phoneNumber = "919618457896"; 
  const message = "Hello Milan Foundation! I would like to know more about your NGO and how I can help.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" />
    </Link>
  );
}
