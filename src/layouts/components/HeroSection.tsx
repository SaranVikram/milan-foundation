"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const slides = [
    {
      title: "Quality Education",
      highlight: "for Every Child",
      subtitle: "Empowering the next generation through learning and growth.",
      image: "/images/school-kid.webp",
      link: "/programs"
    },
    {
      title: "Healthcare Access",
      highlight: "for All Communities",
      subtitle: "Ensuring basic medical support reaches the most vulnerable.",
      image: "/images/village-health.webp",
      link: "/programs"
    },
    {
      title: "Sustainable Livelihood",
      highlight: "& Empowerment",
      subtitle: "Building strong communities through financial independence.",
      image: "/images/skill-training.webp",
      link: "/programs"
    },
    {
      title: "Women Empowerment",
      highlight: "& Social Rights",
      subtitle: "Fostering independence and equality for a better tomorrow.",
      image: "/images/woman-empowerment.webp",
      link: "/programs"
    }
  ];

  return (
    <section className="relative h-[600px] md:h-[800px] w-full overflow-hidden">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}

        modules={[Autoplay, Pagination, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            {/* Optimized Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover transition-transform duration-[10000ms] scale-110 group-hover:scale-100"
                sizes="100vw"
              />
              {/* Darker Overlay */}
              <div className="absolute inset-0 bg-black/70 z-10"></div>
            </div>

            {/* Content */}
            <div className="relative flex h-full items-center justify-center text-center text-white px-4 z-20">
              <div className="max-w-5xl">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-9xl font-bebas tracking-wider uppercase mb-8 leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                >
                  <span className="text-white block">{slide.title}</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] to-[#72BE44] block mt-2">
                    {slide.highlight}
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-3xl font-bold font-raleway mb-12 text-white/90 max-w-3xl mx-auto drop-shadow-lg"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href={slide.link} className="btn-primary">
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Navigation */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255,255,255,0.1);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #72BE44 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
