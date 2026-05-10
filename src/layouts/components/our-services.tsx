import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

interface Service {
    title: string;
    link: string;
  titleColor: string;
  details: string[];
}

const services: Service[] = [
  {
    title: "Web Development",
    link: "/services",
    titleColor: "bg-[#FFA88C]",
    details: [
      "Custom website design & development",
      "Responsive & mobile-first layouts",
      "Performance optimization",
      "CMS integration & setup"
    ],
  },
  {
    title: "UI/UX Design",
    link: "/services",
    titleColor: "bg-[#95A6FF]",
    details: [
      "User research & personas",
      "Wireframes & prototyping",
      "Visual design & branding",
      "Design system creation"
    ],
  },
  {
    title: "Digital Marketing",
    link: "/services",
    titleColor: "bg-[#E5AEFF]",
    details: [
      "Search engine optimization",
      "Social media strategy",
      "Content marketing & creation",
      "Analytics & performance tracking"
    ],
  },
  {
    title: "E-Commerce",
    link: "/services",
    titleColor: "bg-[#6CDFF9]",
    details: [
      "Online store setup & design",
      "Payment gateway integration",
      "Product catalog management",
      "Order & inventory systems"
    ],
  },
  {
    title: "Consulting",
    link: "/services",
    titleColor: "bg-[#7DEFA1]",
    details: [
      "Technology stack advisory",
      "Architecture & scalability review",
      "Project planning & roadmaps",
      "Team augmentation & training"
    ],
  },
  {
    title: "Maintenance & Support",
    link: "/services",
    titleColor: "bg-[#FFD66B]",
    details: [
      "Ongoing website maintenance",
      "Security updates & monitoring",
      "Performance audits & fixes",
      "24/7 technical support"
    ],
  }
];



export const ServiceCards = () => {
    return (
      <section className="w-full py-8 md:py-16 bg-[#FFFFFF]">
            <div className="container">
                
    <div className="w-full  ">
      <div className="space-y-6 md:space-y-8 lg:space-y-10">
        {services.map((service, index) => {
          const isOffset = index === 1 || index === 3;
          
          return (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-[1fr_1.5fr_auto] gap-4 md:gap-5 lg:gap-6 items-center
                ${isOffset ? 'lg:ml-24 md:ml-12' : ''}`}
            >
              {/* Service Title Card */}
              <div
                className={`${service.titleColor} rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-5 md:p-6 lg:p-8 shadow-[5px_5px_0_0_#0D0F30] md:shadow-[6px_6px_0_0_#0D0F30] transition-all hover:shadow-[3px_3px_0_0_#0D0F30] hover:translate-x-[2px] hover:translate-y-[2px]`}
              >
                <h3 className="text-[36px] lg:text-[72px] font-normal text-[#252525] leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Details Card */}
              <div
                className={`${service.titleColor} rounded-[24px] md:rounded-[28px] lg:rounded-[32px] p-5 md:p-6 lg:p-8 shadow-[5px_5px_0_0_#252525] md:shadow-[6px_6px_0_0_#252525] transition-all hover:shadow-[3px_3px_0_0_#252525] hover:translate-x-[2px] hover:translate-y-[2px]`}
              >
                <ul className="space-y-2 md:space-y-2.5">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2.5 md:gap-3">
                      <Check className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-[#252525] flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-[19px] text-[#252525] font-normal">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow Icon Circle */}

<Link href={service.link}>
  <div
    className={`${service.titleColor} rounded-full w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center shadow-[5px_5px_0_0_#0D0F30] md:shadow-[6px_6px_0_0_#0D0F30] transition-all hover:shadow-[3px_3px_0_0_#0D0F30] hover:translate-x-[2px] hover:translate-y-[2px] md:mx-0`}
  >
    <ArrowUpRight className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-[#0D0F30]" strokeWidth={2} />
  </div>
</Link>

            </div>
          );
        })}
      </div>
                </div>
            </div>
            </section>
  );
};