"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, HeartPulse, Briefcase, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const ProgramsLayout = () => {
  const [activeSection, setActiveSection] = useState("education");

  const sections = [
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "skills", label: "Skill Development" },
    { id: "women", label: "Women Empowerment" },
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

  const programData = [
    {
      id: "education",
      title: "Quality Education",
      subtitle: "Empowering Minds, Shaping Futures",
      description: "We provide comprehensive educational support to children from marginalized backgrounds. Our programs include remedial classes, school supplies, and scholarship support to ensure every child has the chance to complete their education.",
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
      features: ["Remedial Education Centers", "School Kit Distribution", "Digital Literacy Labs", "Teacher Training Workshops"]
    },
    {
      id: "healthcare",
      title: "Healthcare Access",
      subtitle: "Ensuring Health for All",
      description: "Our healthcare initiatives focus on providing preventive and primary healthcare services to those who lack access. We organize health camps, awareness sessions, and provide support for critical medical treatments.",
      icon: <HeartPulse className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
      features: ["Mobile Health Vans", "Nutrition Programs", "Maternal & Child Health", "Disability Support"]
    },
    {
      id: "skills",
      title: "Skill Development",
      subtitle: "Building Sustainable Livelihoods",
      description: "We empower youth and adults with vocational skills that enhance their employability and entrepreneurial spirit. From computer training to tailoring, our courses are designed to meet market needs.",
      icon: <Briefcase className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1542810634-7bc2c7ad442d?q=80&w=2070&auto=format&fit=crop",
      features: ["Vocational Training Centers", "Entrepreneurship Support", "Placement Assistance", "Financial Literacy"]
    },
    {
      id: "women",
      title: "Women Empowerment",
      subtitle: "Fostering Independence and Rights",
      description: "Our women-focused programs aim to provide social and economic empowerment. We advocate for rights, provide vocational training, and support self-help groups to foster financial independence.",
      icon: <Users className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
      features: ["Self-Help Groups (SHGs)", "Legal Awareness", "Leadership Training", "Small Business Grants"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Sticky Sub-Navigation */}
      <div className="sticky top-0 z-40 bg-[#FFDE00] shadow-sm overflow-x-auto whitespace-nowrap">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 md:gap-12 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeSection === section.id ? "text-slate-900 border-b-2 border-slate-900" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Program Sections */}
      {programData.map((program, index) => (
        <section 
          key={program.id} 
          id={program.id} 
          className={`py-20 md:py-32 ${index % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}
        >
          <div className="container">
            <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
              <div className="md:w-1/2">
                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                  {program.icon}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-2">{program.subtitle}</h3>
                <h2 className="text-4xl md:text-5xl font-bebas tracking-wider text-slate-900 mb-6 uppercase leading-tight">
                  {program.title}
                </h2>
                <div className="w-20 h-1.5 bg-primary mb-8"></div>
                <p className="text-lg text-slate-600 leading-relaxed font-raleway mb-8">
                  {program.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {program.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-slate-700 font-medium font-raleway">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/donate" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all group"
                >
                  Support this Program <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-6 ${index % 2 === 1 ? '-left-6' : '-right-6'} bg-[#FFDE00] p-6 md:p-10 rounded-3xl shadow-xl max-w-[240px]`}>
                    <p className="text-slate-900 font-bold font-raleway leading-tight">
                      Making a difference for over 50,000+ individuals since 2014.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Global Impact CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-6xl font-bebas mb-8 uppercase tracking-wider">Every Life Matters</h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-raleway">
            Join us in our journey to create a more equitable world. Your support can change a life today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/donate" className="btn-primary bg-white text-primary hover:bg-slate-100 border-none px-12 py-5 text-xl">
              Donate Now
            </Link>
            <Link href="/contact" className="btn-outline-primary border-white text-white hover:bg-white hover:text-primary px-12 py-5 text-xl">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsLayout;
