import React from "react";
import HeroSection from "@/components/HeroSection";
import SeoMeta from "@/partials/SeoMeta";
import AboutUsSection from "@/components/AboutUsSection";
import GalleryGrid from "@/components/GalleryGrid";
import OurPrograms from "@/components/our-programs";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/Cta";
import Link from "next/link";
import config from "@/config/config.json";

export const dynamic = 'force-static';

const Home = async () => {
  return (
    <>
      <SeoMeta
        title="Milan Foundation | Learning - Growing - Achieving"
        meta_title="Milan Foundation - NGO in Hyderabad for Community Support"
        description="Milan Foundation is a Hyderabad-based NGO dedicated to community empowerment through education, healthcare, and sustainable development. Learning - Growing - Achieving."
        image={config.metadata.meta_image}
        canonical={config.site.base_url}
      />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Thematic Areas - What We Do */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeader 
            title="Our Focus Areas" 
            description="We focus on core thematic areas that create the most impact and drive sustainable change."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 font-raleway">
            {[
              { title: "Education", icon: "🎓", color: "bg-amber-500", desc: "Providing quality education to underprivileged children." },
              { title: "Healthcare", icon: "🏥", color: "bg-red-500", desc: "Ensuring basic healthcare reaches every corner." },
              { title: "Livelihood", icon: "💼", color: "bg-green-500", desc: "Empowering families with sustainable income sources." },
              { title: "Women Empowerment", icon: "👩", color: "bg-violet-500", desc: "Advocating for rights and financial independence." }
            ].map((area, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 bg-slate-50 hover:bg-white text-center">
                <div className={`${area.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 transform group-hover:rotate-12 transition-transform`}>
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{area.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{area.desc}</p>
                <Link href="/programs" className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Know More <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="container relative z-10">
          <SectionHeader 
            title="Our Collective Impact" 
            description="The numbers speak for themselves. Every contribution translates into real-world change."
            light
          />
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { val: "50,000+", label: "Lives Impacted" },
              { val: "100+", label: "Villages Reached" },
              { val: "500+", label: "Volunteers" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-7xl font-bebas text-primary mb-4">{stat.val}</div>
                <div className="text-xl uppercase tracking-widest text-slate-400 font-bebas">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeader 
            title="Our Story" 
            description="Founded on the principles of compassion and empowerment, we strive to make a lasting difference."
          />
          <AboutUsSection />
        </div>
      </section>



      {/* Image Gallery Snippet */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeader 
            title="Our Impact in Photos" 
            description="Capturing moments of change and empowerment across the globe."
          />
          <GalleryGrid />
        </div>
      </section>

      {/* Partners / Trust Marks */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container">
          <div className="text-center mb-8 uppercase text-slate-400 font-bebas tracking-[0.2em] text-sm">
            Partners in Change
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* These would be corporate logos */}
            <div className="text-2xl font-black text-slate-900">CORPORATE</div>
            <div className="text-2xl font-black text-slate-900">GOVERNMENT</div>
            <div className="text-2xl font-black text-slate-900">FOUNDATION</div>
            <div className="text-2xl font-black text-slate-900">INDIVIDUAL</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CtaSection />
    </>
  );
};

export default Home;
