"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

interface IDonationFormState {
  fullName: string;
  email: string;
  amount: string;
  pan: string;
  mobile: string;
}

const DonationForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<IDonationFormState>({
    fullName: "",
    email: "",
    amount: "",
    pan: "",
    mobile: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Details Saved",
      description: "Please proceed with the UPI payment below.",
    });
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold mb-8 text-slate-900">Donor Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="info@milanfoundation.ngo"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Donation Amount (INR) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="5000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Mobile Number *</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">PAN Card Number (for 80G tax benefit)</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="ABCDE1234F"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-white font-bold rounded-2xl transition-all hover:bg-primary/90 hover:shadow-lg mt-4"
        >
          Confirm Details
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
