"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, Heart, Shield, Users, BookOpen, HeartPulse, Handshake } from "lucide-react";

const OurStory = () => {
  const [activeSection, setActiveSection] = useState("story");

  const sections = [
    { id: "story", label: "Our Story" },
    { id: "vision", label: "Vision" },
    { id: "mission", label: "Mission" },
    { id: "philosophy", label: "Philosophy of Change" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white">
      {/* Sticky Sub-Navigation */}
      <div className="sticky top-0 z-40 bg-[#FFDE00] shadow-sm overflow-x-auto whitespace-nowrap">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm md:text-base font-bold uppercase tracking-wider transition-colors ${
                  activeSection === section.id ? "text-slate-900 border-b-2 border-slate-900" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section id="story" className="py-20 md:py-32">
        <div className="container max-w-4xl text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wider text-slate-900 mb-8 uppercase">How it all began</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto mb-10"></div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-raleway mb-8">
              Founded by <strong>Shyam Kumar</strong>, Milan Foundation was born out of a simple yet powerful belief: every individual deserves the opportunity to learn, grow, and achieve their full potential.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-raleway">
              What started as a small community initiative in Hyderabad has grown into a movement of hope. Over the past decade, we have worked tirelessly to bridge the gap in education, healthcare, and livelihood for the most underserved communities. Our story is not just about our growth, but about the thousands of lives that have been transformed through collective action and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wider text-slate-900 mb-4 uppercase">Our Vision</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            { [
              { icon: <Eye className="w-8 h-8 text-primary" />, title: "Equality", desc: "A world where every individual has equal opportunities to thrive regardless of their background." },
              { icon: <Shield className="w-8 h-8 text-primary" />, title: "Dignity", desc: "Preserving and enhancing the dignity of every person we serve through respectful support." },
              { icon: <Users className="w-8 h-8 text-primary" />, title: "Community", desc: "Building strong, self-reliant communities that can sustain their own growth and development." }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm text-center border border-slate-100"
              >
                <div className="bg-[#FFDE00]/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-raleway">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 md:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bebas tracking-wider text-slate-900 mb-6 uppercase">Our Mission</h2>
              <div className="w-20 h-1.5 bg-primary mb-8"></div>
              <p className="text-lg text-slate-600 leading-relaxed font-raleway mb-8">
                To be a catalyst for global change, inspiring a movement of kindness and cooperation that transforms lives and preserves the dignity of every person we serve.
              </p>
              <div className="space-y-4">
                {[
                  "Providing quality education to underprivileged children.",
                  "Ensuring basic healthcare reaches the most vulnerable.",
                  "Empowering women and families through skill development.",
                  "Advocating for social justice and community rights."
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-slate-700 font-medium font-raleway">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                <img 
                  src="/images/indian-kids.webp" 
                  alt="Our Mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#FFDE00] p-8 rounded-3xl shadow-xl hidden lg:block">
                <div className="text-4xl font-bebas text-slate-900 mb-1">10+ YEARS</div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-700">OF IMPACT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wider mb-4 uppercase">Philosophy of Change</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto mb-8"></div>
            <p className="text-slate-400 max-w-2xl mx-auto font-raleway">
              We believe in &quot;Social Venture Philanthropy&quot; - an innovative model that combines the best of corporate logic and NGO compassion.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen className="w-6 h-6 text-primary" />, title: "Education First", desc: "Education is the key to unlocking potential and breaking the cycle of poverty." },
              { icon: <HeartPulse className="w-6 h-6 text-primary" />, title: "Health & Wellbeing", desc: "Sustainable change is impossible without basic medical security and health awareness." },
              { icon: <Users className="w-6 h-6 text-primary" />, title: "Civic Driven", desc: "Empowering citizens to take charge of their own community development." },
              { icon: <Handshake className="w-6 h-6 text-primary" />, title: "Partnerships", desc: "Collaborating with government and corporate bodies for maximum scalable impact." }
            ].map((item, index) => (
              <div key={index} className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-raleway">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
