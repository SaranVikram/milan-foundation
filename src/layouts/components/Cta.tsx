"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFDE00]/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-primary font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base">
            Take the First Step
          </h3>
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wider text-white mb-8 uppercase leading-tight">
            Ready to make a <span className="text-primary italic">Real Difference?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-raleway max-w-2xl mx-auto mb-12">
            Whether you want to donate, volunteer, or partner with us, your contribution is the catalyst for sustainable change.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/donate" 
              className="w-full sm:w-auto group relative px-10 py-5 bg-primary text-slate-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 overflow-hidden flex items-center justify-center"
            >
              <span className="relative z-10 text-xl">Donate Now</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            
            <Link 
              href="/contact" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 border-2 border-slate-700 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all text-xl"
            >
              Volunteer With Us <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Trust Quote */}
      <div className="mt-20 text-center border-t border-white/5 pt-12">
        <p className="text-slate-500 font-medium italic font-raleway">
          &quot;The best way to find yourself is to lose yourself in the service of others.&quot; — Mahatma Gandhi
        </p>
      </div>
    </section>
  );
};

export default CtaSection;