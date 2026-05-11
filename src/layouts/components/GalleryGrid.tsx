"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  { src: "/images/boy-reading.webp", alt: "Child Education", category: "Education" },
  { src: "/images/school-distribution.webp", alt: "School Support", category: "Education" },
  { src: "/images/village-health.webp", alt: "Healthcare Camp", category: "Health" },
  { src: "/images/woman-empowerment.webp", alt: "Women Empowerment", category: "Social" },
  { src: "/images/skill-training.webp", alt: "Skill Development", category: "Skill" },
  { src: "/images/hands-water.webp", alt: "Clean Water Project", category: "Environment" },
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative h-80 rounded-3xl overflow-hidden shadow-md"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="text-white/70 text-sm mb-1">{image.category}</span>
            <h3 className="text-white font-bold text-lg">{image.alt}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
