
import React from 'react'
import SeoMeta from "@/partials/SeoMeta";
import { ServiceCards } from "@/components/our-services";
import { PageHero } from "@/layouts/components/PageHero";
import { FlexiblePricing } from '@/components/flexible-pricing';
import { CtaSection } from '@/components/Cta';
import config from "@/config/config.json";

export const dynamic = 'force-static';

function Services() {
  return (
    <>
      <SeoMeta
        title={`Services | ${config.site.title}`}
        meta_title={`Our Services | ${config.site.title}`}
        description="Explore all the services we offer. From web development to digital marketing, we have you covered."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/services`}
      />

      <PageHero
        title="Our Services"
        description="Explore our full range of services designed to help your business grow."
      />
      <ServiceCards />
      <FlexiblePricing />
      <CtaSection />
    </>
  )
}

export default Services
