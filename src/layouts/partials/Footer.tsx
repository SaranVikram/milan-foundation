"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [subData, setSubData] = React.useState({ name: "", email: "" });
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subData.email) return;

    setLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subData),
      });

      if (response.ok) {
        toast({
          title: "Successfully Subscribed!",
          description: "You've been added to our newsletter list.",
        });
        setSubData({ name: "", email: "" });
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription Error",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#444444] text-white py-16 px-6 md:px-12">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <h3 className="text-xl font-bold font-raleway">Milan Foundation</h3>
            <p className="text-slate-200 text-sm leading-relaxed max-w-md">
              Plot No.203, Flat No.8, Sharadha Mansion, Kalyan Nagar Venture-1, S.R.Nagar, Hyderabad, Telangana - 500 038, India
            </p>
            <p className="text-slate-200 text-sm">
              Contact Us: Tel: <a href="tel:+919618457896" className="hover:text-primary transition-colors">+91 96184 57896</a> | E-mail: <a href="mailto:info@milanfoundation.ngo" className="hover:text-primary transition-colors">info@milanfoundation.ngo</a>
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <Facebook size={20} fill="currentColor" />, href: "#" },
              { icon: <Twitter size={20} fill="currentColor" />, href: "#" },
              { icon: <Youtube size={20} fill="currentColor" />, href: "#" },
              { icon: <Instagram size={20} />, href: "#" },
              { icon: <Linkedin size={20} fill="currentColor" />, href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section - Newsletter */}
        <form onSubmit={handleSubscribe} className="space-y-6 pt-8">
          <h4 className="text-lg font-medium font-raleway">Subscribe to Our Newsletter</h4>
          <div className="flex flex-col md:flex-row gap-0 items-stretch md:items-end">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0">
              <input
                type="text"
                placeholder="Name"
                value={subData.name}
                onChange={(e) => setSubData({ ...subData, name: e.target.value })}
                className="bg-transparent border-b border-slate-500 py-3 px-2 outline-none focus:border-primary transition-colors text-slate-200 placeholder:text-slate-500"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                required
                value={subData.email}
                onChange={(e) => setSubData({ ...subData, email: e.target.value })}
                className="bg-transparent border-b border-slate-500 py-3 px-2 outline-none focus:border-primary transition-colors text-slate-200 placeholder:text-slate-500"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#72BE44] hover:bg-[#85d155] text-white font-bold uppercase tracking-widest px-12 py-4 mt-8 md:mt-0 transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </div>
        </form>

        {/* Copyright */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-500 gap-4">
          <p>© {currentYear} Milan Foundation. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
