"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Heart, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    subject: "General Inquiry",
    message: ""
  });

  const inquiryTypes = [
    { label: "General Inquiry", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Volunteering", icon: <Users className="w-4 h-4" /> },
    { label: "Donations", icon: <Heart className="w-4 h-4" /> },
    { label: "Partnerships", icon: <Globe className="w-4 h-4" /> }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/submitform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. Our team will contact you soon.",
        });
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          subject: "General Inquiry",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Contact Information */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-4xl font-bebas tracking-wider text-slate-900 mb-6 uppercase">Get in Touch</h2>
              <div className="w-20 h-1.5 bg-primary mb-8"></div>
              <p className="text-slate-600 font-raleway leading-relaxed">
                Have questions about our programs or want to get involved? We&apos;d love to hear from you. 
                Our team is dedicated to providing the support and information you need.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Our Office</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Plot No.203, Flat No.8, Sharadha Mansion,<br />
                    Kalyan Nagar Venture-1, S.R.Nagar,<br />
                    Hyderabad, Telangana - 500 038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                  <a href="mailto:info@milanfoundation.ngo" className="text-slate-500 text-sm hover:text-primary transition-colors">
                    info@milanfoundation.ngo
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                  <a href="tel:+919618457896" className="text-slate-500 text-sm hover:text-primary transition-colors">
                    +91 96184 57896
                  </a>
                </div>
              </div>
            </div>

            {/* Social Proof / Trust Mark */}
            <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
              <p className="text-slate-900 font-bold font-raleway mb-2 text-center uppercase tracking-widest text-xs">Registered NGO</p>
              <div className="text-center font-bebas text-2xl text-primary">TAN: HYDM33353F</div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-[60px] shadow-2xl shadow-slate-200 border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-raleway"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700 ml-1">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 00000 00000"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-raleway"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="info@milanfoundation.ngo"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-raleway"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700 ml-1">Inquiry Type</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-raleway appearance-none"
                    >
                      {inquiryTypes.map((type, i) => (
                        <option key={i} value={type.label}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700 ml-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-raleway resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
                >
                  Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
