import React from "react";
import { PageHero } from "@/layouts/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import GalleryGrid from "@/components/GalleryGrid";
import config from "@/config/config.json";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoMeta
        title={`Gallery | Milan Foundation`}
        meta_title={`Impact Gallery | Milan Foundation Community Photos`}
        description="View photos of our initiatives and the impact Milan Foundation is making in the community. Seeing our mission in action."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/gallery`}
      />

      <PageHero
        title="OUR GALLERY"
        description="Capturing moments of change and empowerment across the globe."
      />
      
      <section className="py-20">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
      
      <section className="py-20 bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-8">Every Picture Tells a Story</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            These images reflect the resilience of the communities we support and the dedication of our 
            volunteers who make this work possible. Each smile represents a life changed.
          </p>
          <div className="inline-block px-8 py-4 bg-primary rounded-full font-bold text-white transition-transform hover:scale-105">
            Support Our Mission
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
