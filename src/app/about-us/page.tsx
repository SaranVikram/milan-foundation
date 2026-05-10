import React from "react";
import { PageHero } from "@/layouts/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import OurStory from "@/components/OurStory";
import config from "@/config/config.json";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoMeta
        title={`About Us | Milan Foundation`}
        meta_title={`Our Story & Mission | Milan Foundation NGO`}
        description="Learn about Milan Foundation, our mission of 'Learning - Growing - Achieving', and our leadership under President Shyam Kumar in Hyderabad."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/about-us`}
      />

      <PageHero
        title="OUR STORY"
        description="Learning - Growing - Achieving: Our journey towards a more equitable world."
      />
      
      <OurStory />
    </div>
  );
};

export default AboutUs;
