import React from "react";
import { PageHero } from "@/layouts/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import config from "@/config/config.json";

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoMeta
        title={`Get Involved | Milan Foundation`}
        meta_title={`Volunteer & Support | Join Milan Foundation`}
        description="Find out how you can contribute to Milan Foundation. Volunteer your time, donate, or partner with us to create a lasting impact in Hyderabad."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/get-involved`}
      />

      <PageHero
        title="GET INVOLVED"
        description="Your support is the fuel that drives our mission forward."
      />

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ways You Can Help</h2>
              <p className="text-lg text-slate-600 mb-8">
                There are many ways to support our mission. Whether you have time to volunteer, 
                resources to share, or funds to donate, every contribution makes a meaningful difference 
                in the lives of those we serve.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Volunteer Your Time</h3>
                    <p className="text-slate-600">Join our local chapters and help execute our programs on the ground.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Become a Partner</h3>
                    <p className="text-slate-600">Corporations and institutions can partner with us for CSR initiatives and long-term impact.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Spread the Word</h3>
                    <p className="text-slate-600">Follow us on social media and share our stories to raise awareness for our cause.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-10 rounded-[40px] border-2 border-slate-200">
              <h3 className="text-2xl font-bold mb-6 text-center">Make an Immediate Impact</h3>
              <p className="text-center text-slate-600 mb-8">
                Financial contributions allow us to respond quickly to emergencies and maintain our long-term development projects.
              </p>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/donate"
                  className="w-full py-4 bg-primary text-white text-center font-bold rounded-2xl transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Donate Now
                </Link>
                <Link 
                  href="/contact"
                  className="w-full py-4 bg-white border-2 border-slate-200 text-slate-900 text-center font-bold rounded-2xl transition-all hover:bg-slate-100"
                >
                  Inquire About Volunteering
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
