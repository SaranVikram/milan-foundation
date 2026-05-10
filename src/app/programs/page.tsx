import { PageHero } from "@/layouts/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import ProgramsLayout from "@/components/ProgramsLayout";
import config from "@/config/config.json";

const Programs = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoMeta
        title={`Our Programs | Milan Foundation`}
        meta_title={`NGO Programs & Initiatives | Milan Foundation Hyderabad`}
        description="Explore the various programs by Milan Foundation, including Child Education, Healthcare Access, and Skill Development initiatives in Telangana."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/programs`}
      />

      <PageHero
        title="OUR PROGRAMS"
        description="Empowering communities through targeted social initiatives."
      />
      
      <ProgramsLayout />
    </div>
  );
};

export default Programs;
