"use client"
import { SectionHeading } from "@/shortcodes/SectionHeading";
import React from "react";
import Link from "next/link";

export const FlexiblePricing = () => {
  const features = [
    "Custom website design & development",
    "Responsive, mobile-first layouts",
    "SEO optimization & analytics setup",
    "Monthly maintenance & updates",
    "Priority support via email & chat",
  ];

  return (
    <section className="py-8 lg:py-16">
      <div className="container">
        <SectionHeading text="our Pricing" color={{ name: "white", hex: "#000" }} />

        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden  mt-8 md:mt-16">
          {/* Left Section */}
          <div className="bg-[#7E9AFB] p-8 md:p-12 lg:p-16 flex flex-start">
            <h3 className="text-white text-[36px] lg:text-[72px] font-normal leading-tight capitalize">
              Full-Service Digital Package
            </h3>
          </div>

          {/* Right Section */}
          <div className="bg-[#FFF9F3] p-8 md:p-12 lg:p-16">
            <div className="mb-6">
              <p className="text-[#FF6B4A] font-semibold text-sm mb-1 uppercase tracking-wide">
                starting at
              </p>
              <p className="text-[#252525] font-bold text-5xl md:text-6xl mb-2">
                $499
              </p>
              <p className="text-[#2D2D2D] font-semibold text-lg md:text-xl">
                per month
              </p>
            </div>

            <p className="text-[#4A4A4A] text-base md:text-lg mb-8 leading-relaxed">
              Everything you need to establish and grow your online presence.
              From design to deployment and beyond.
            </p>

            <div className="mb-8">
              <h3 className="text-[#2D2D2D] font-bold text-lg md:text-xl mb-5">
                The package includes:
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[#252525] text-[19px] font-normal leading-snug"
                  >
                    <span className="text-[#2D2D2D] font-bold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[#777] text-xs md:text-sm italic mb-6">
              *Custom packages available based on your specific needs and goals.
            </p>

            <Link href="/contact" className="inline-block w-full md:w-auto bg-[#252525] hover:bg-[#000] text-white font-semibold py-4 px-10 rounded-full transition-all hover:scale-[1.03] text-center">
              I&apos;m interested
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
