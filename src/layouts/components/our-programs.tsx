"use client";

import React from 'react'
import Link from 'next/link';

const programs = [
  {
    name: "Child Education",
    link: "/programs",
    className: "bg-[#76c04e]",
    positionClasses: "left-[-30px] top-[60px] lg:left-[-170px] lg:top-[200px]",
    rotationClasses: "rotate-[-10deg]",
  },
  {
    name: "Healthcare Access",
    link: "/programs",
    className: "bg-[#8dc73f]",
    positionClasses: "left-[50px] top-[74px] lg:left-[100px] lg:top-[200px]",
    rotationClasses: "rotate-[5deg]",
  },
  {
    name: "Clean Water",
    link: "/programs",
    className: "bg-[#334aff]",
    positionClasses: "left-[100px] top-[-80px] lg:left-[300px] lg:top-[-200px]",
    rotationClasses: "rotate-[-5deg]",
  },
  {
    name: "Skill Development",
    link: "/programs",
    className: "bg-[#cd2653]",
    positionClasses: "right-[0px] top-[40px] lg:right-[200px] lg:top-[200px]",
    rotationClasses: "rotate-[10deg]",
  },
  {
    name: "Elderly Care",
    link: "/programs",
    className: "bg-[#e76a6a]",
    positionClasses: "right-[-15px] top-[160px] lg:right-[-150px]",
    rotationClasses: "rotate-[-8deg]",
  },
];

function OurPrograms() {
  return (
    <section className='py-24 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Programs</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We focus on key areas that create the most impact and drive sustainable change in the communities we serve.
          </p>
        </div>
        
        <div className='rounded-[80px] pt-[150px] pb-[250px] px-[15px] sm:pt-[250px] sm:pb-[400px] md:pt-[350px] md:pb-[500px] lg:pt-[400px] lg:pb-[650px] border-[3px] border-slate-900 border-solid flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden'>
          <div className='flex w-full flex-1 gap-[0px_75px]'>
            <div className='flex justify-center items-center w-full gap-[5px_5px] lg:mx-[100px] relative'>
              {programs.map((program, index) => (
                <div
                  key={index}
                  className={`absolute -translate-y-1/2 ${program.positionClasses} ${program.rotationClasses}`}
                >
                  <div
                    className={`relative flex justify-center font-bold rounded-[110px] border-2 border-slate-900 items-center gap-2 overflow-hidden 
                      text-[16px] px-[20px] py-[10px] 
                      sm:text-[20px] sm:px-[32px] sm:py-[16px] 
                      md:px-[60px] md:py-[30px] 
                      lg:text-[28px] lg:px-[100px] lg:py-[45px] 
                      ${program.className} shadow-lg transition-transform hover:scale-105`}
                  >
                    <Link
                      href={program.link}
                      className="no-underline whitespace-nowrap text-ellipsis text-white overflow-hidden font-bold"
                    >
                      {program.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPrograms
