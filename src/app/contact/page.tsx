"use client"

import React from "react";
import {PageHero} from "@/layouts/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import ContactForm from "@/components/ContactForm";
import config from "@/config/config.json";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoMeta
        title={`Contact Us | Milan Foundation`}
        meta_title={`Get in Touch | Milan Foundation Hyderabad`}
        description="Contact Milan Foundation for inquiries, volunteering, or partnerships. Located in S.R.Nagar, Hyderabad. Reach us at +91 96184 57896."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/contact`}
        enableSearchAction={false}
      />

      <PageHero
        title="CONTACT US"
        description="Have questions or want to volunteer? Reach out to our team."
      />
      <ContactForm />
    </div>
  );
};

export default Contact;
