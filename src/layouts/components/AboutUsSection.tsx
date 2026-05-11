"use client";
import {
  Award,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import React from 'react'

function AboutUsSection() {
  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  return (
    <div className="bg-slate-50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto py-24 px-4 sm:px-6"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeIn} className="relative">
            <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl relative z-10">
              <img
                src="/images/indian-kids.webp"
                alt="Our Impact"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 md:-bottom-8 md:-right-8 md:w-48 md:h-48 bg-primary rounded-2xl md:rounded-[40px] flex flex-col items-center justify-center text-white z-20 shadow-xl">
              <span className="text-2xl md:text-4xl font-bebas leading-none">7+</span>
              <span className="text-[9px] md:text-sm uppercase tracking-widest font-bold text-center px-2 leading-tight">Years of Impact</span>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-8">
            <div className="pt-4">
              <p className="text-slate-600 text-lg leading-relaxed font-raleway">
                Founded by <strong>Shyam Kumar</strong>, Milan Foundation was born out of a simple belief: every individual deserves the opportunity to learn, grow, and achieve their full potential.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: "Our Mission", desc: "To provide quality education and healthcare to the most vulnerable communities." },
                { title: "Our Vision", desc: "A society where poverty no longer limits a person's ability to succeed." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-slate-600 font-raleway">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about-us"
                className="btn-primary"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutUsSection;
