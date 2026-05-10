import React from "react";
import { PageHero } from "@/layouts/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import DonationForm from "@/components/DonationForm";
import Image from "next/image";
import config from "@/config/config.json";

const Donate = () => {
  return (
    <div className="min-h-screen bg-white">
      <SeoMeta
        title={`Donate Now | Milan Foundation`}
        meta_title={`Support Our Cause | Milan Foundation Donations`}
        description="Your contribution helps Milan Foundation drive initiatives in education and healthcare. Donate now to make a difference. 80G Tax Benefits available."
        image={config.metadata.meta_image}
        canonical={`${config.site.base_url}/donate`}
      />

      <PageHero
        title="SUPPORT OUR CAUSE"
        description="Your contribution directly fuels our initiatives and changes lives."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <DonationForm />
            </div>
            
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
              <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl text-center">
                <h3 className="text-2xl font-bebas tracking-wider mb-6">Scan to Pay via UPI</h3>
                <div className="relative w-56 h-56 mx-auto mb-8 bg-white p-4 rounded-3xl shadow-inner">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                    QR Code Image
                  </div>
                </div>
                <div className="space-y-3 bg-white/5 py-4 rounded-2xl">
                  <p className="text-slate-400 text-xs uppercase tracking-widest">Official UPI ID</p>
                  <p className="font-mono text-xl font-bold text-primary">9618457896@upi</p>
                </div>
              </div>
              
              <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/20">
                <h3 className="text-xl font-bold mb-4 text-slate-900">80G Tax Benefits</h3>
                <p className="text-slate-600 leading-relaxed font-raleway">
                  All donations made to <strong>Milan Foundation</strong> are eligible for tax exemption under Section 80G of the Income Tax Act. 
                  Receipts will be sent to your registered email address within 7 working days.
                </p>
              </div>
              
              <div className="p-8 border border-slate-100 rounded-[40px] bg-slate-50/50">
                <h4 className="text-lg font-bold mb-6 text-slate-900 uppercase tracking-tight">Direct Bank Transfer</h4>
                <div className="space-y-4 text-slate-700 text-sm font-raleway">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Account Name:</span>
                    <span className="font-bold">MILAN FOUNDATION</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Account Number:</span>
                    <span className="font-bold tracking-wider">000000000000</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">IFSC Code:</span>
                    <span className="font-bold">HDFC0000000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bank:</span>
                    <span className="font-bold">HDFC BANK LTD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
