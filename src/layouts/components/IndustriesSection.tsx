
"use client"
import React, { useEffect, useRef } from 'react';
import { AnimatedTooltip, IndustryItem } from '@/components/ui/animated-tooltip';

const industries: IndustryItem[] = [
  {
    id: 1,
    name: "IT Staffing",
    description: "Expert IT talent acquisition and management for your technology needs.",
    icon: "briefcase-it",
    sectors: [
      "Software Development",
      "Data Science & Analytics",
      "Cloud Infrastructure",
      "DevOps & SRE",
      "IT Support & Maintenance",
      "Quality Assurance"
    ]
  },
  {
    id: 2,
    name: "Non-IT Staffing",
    description: "Specializing in recruitment for diverse non-technical sectors, ensuring the right fit for your team.",
    icon: "users-group", // Example icon name
    sectors: [
      "Human Resources",
      "Sales & Marketing",
      "Finance & Accounting",
      "Administrative Support",
      "Customer Service",
      "Operations Management"
    ]
  },
  {
    id: 3,
    name: "Semiconductor",
    description: "Deep understanding of the semiconductor industry, providing experts for design, manufacturing, and testing.",
    icon: "microchip", // Example icon name
    sectors: [
      "Chip Design & EDA",
      "Fabrication & Manufacturing",
      "Assembly & Testing",
      "Supply Chain Management",
      "Semiconductor R&D",
      "Embedded Systems"
    ]
  },
  {
    id: 4,
    name: "Artificial Intelligence",
    description: "Specialized in AI and Machine Learning, offering talent that drives innovation and intelligent solutions.",
    icon: "brain-circuit", // Example icon name
    sectors: [
      "Machine Learning Engineering",
      "Data Science for AI",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "AI Ethics & Governance",
      "Robotics Process Automation (RPA)"
    ]
  },
  {
    id: 5,
    name: "Automobile",
    description: "Connecting the automotive industry with professionals skilled in engineering, design, and manufacturing processes.",
    icon: "car-side", // Example icon name
    sectors: [
      "Automotive Design & Engineering",
      "Electric Vehicles (EV) Technology",
      "Autonomous Driving Systems",
      "Manufacturing & Production",
      "Automotive Supply Chain & Logistics",
      "Connected Car Technology"
    ]
  }
];

const IndustriesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("IndustriesSection mounted with", industries.length, "industries");

    const currentSection = sectionRef.current; // Capture the ref's current value

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection); // Use the captured value in cleanup
      }
    };
  }, []);

  return (
    <div className="py-12 bg-gray-50" id="industries">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="section-transition section-appear mb-10 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Industries We Serve</h2>
          <p className="text-lg text-slate-600  max-w-3xl mx-auto">
            Our expertise spans across multiple industries, providing specialized solutions for each sector.
          </p>
        </div>

        <div className="mt-10">
          <AnimatedTooltip items={industries} />
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;
