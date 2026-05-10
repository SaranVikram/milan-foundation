import React from 'react'



function ServicesSection() {
   const services = [
  {
    name: "Service One",
    link: "/services",
    className: "bg-[#ECBB3E]",
    positionClasses: `
      left-[-30px] top-[60px]
      sm:left-[-30px] sm:top-[80px]
      md:left-[-50px] md:top-[120px]
      lg:left-[-170px] lg:top-[200px]
      xl:left-[-170px] xl:top-[200px]
    `,
    rotationClasses: `
      rotate-[-65deg]
      sm:rotate-[-65deg]
      md:rotate-[-65deg]
      lg:rotate-[-65deg]
      xl:rotate-[-65deg]
    `,
  },
  {
    name: "Service Two",
    link: "/services",
    className: "bg-[#A0D1CA]",
    positionClasses: `
      left-[50px] top-[74px]
      sm:left-[120px] sm:top-[80px]
      md:left-[150px] md:top-[120px]
      lg:left-[100px] lg:top-[200px]
      xl:left-[100px] xl:top-[200px]
    `,
    rotationClasses: `
      rotate-[-75deg]
      sm:rotate-[-90deg]
      md:rotate-[-90deg]
      lg:rotate-[-90deg]
      xl:rotate-[-90deg]
    `,
  },
  {
    name: "Service Three",
    link: "/services",
    className: "bg-[#F4BABA]",
    positionClasses: `
      left-[100px] top-[-80px]
      sm:left-[150px] sm:top-[-100px]
      md:left-[300px] md:top-[-150px]
      lg:left-[300px] lg:top-[-200px]
      xl:left-[300px] xl:top-[-200px]
    `,
    rotationClasses: `
      rotate-[-10deg]
      sm:rotate-[-10deg]
      md:rotate-[-10deg]
      lg:rotate-[-10deg]
      xl:rotate-[-10deg]
    `,
  },
  {
    name: "Service Four",
    link: "/services",
    className: "bg-[#B4AEE8]",
    positionClasses: `
      right-[0px] top-[40px]
      sm:right-[200px] sm:top-[80px]
      md:right-[200px] md:top-[120px]
      lg:right-[200px] lg:top-[200px]
      xl:right-[300px] xl:top-[200px]
    `,
    rotationClasses: `
      rotate-[-105deg]
      sm:rotate-[-105deg]
      md:rotate-[-105deg]
      lg:rotate-[-105deg]
      xl:rotate-[-105deg]
    `,
  },
  {
    name: "Service Five",
    link: "/services",
    className: "bg-[#A7D39B]",
    positionClasses: `
      right-[-15px] top-[160px]
      sm:right-[-30px]
      md:right-[-50px]
      lg:right-[-150px]
      xl:right-[-100px]
    `,
    rotationClasses: `
      rotate-[-12deg] 
      sm:rotate-[-55deg]
      md:rotate-[-55deg]
      lg:rotate-[-55deg]
      xl:rotate-[-55deg]
    `,
  },
];



  
  return (
    <section className='py-16 bg-[linear-gradient(180deg,#186FD6_60%,#FFFFFF_60%)]'>
      <div className='container mx-auto px-4'>
              <div className=' rounded-[80px] mt-[-75px] pt-[150px] pb-[250px] px-[15px] sm:pt-[250px] sm:pb-[400px] sm:px-0  md:pt-[350px] md:pb-[500px]  lg:pt-[400px] lg:pb-[650px]  border-[3px] border-[#000] border-solid flex flex-col justify-center items-center bg-[#7E9AFB]'>
                  <div className='flex w-full flex-1 gap-[0px_75px]'>
                      <div className=' flex justify-center items-center w-full gap-[5px_5px] lg:mx-[100px] relative'>
                          {services.map((service, index) => (
  <div
    key={index}
    className={`
      absolute -translate-y-1/2
      ${service.positionClasses}
      ${service.rotationClasses}
    `}
  >
    <div
      className={`relative flex justify-center font-bold rounded-[110px] border-4 items-center gap-2 overflow-hidden 
        text-[16px] px-[20px] py-[10px] 
        sm:text-[20px] sm:px-[32px] sm:py-[16px] 
        md:px-[60px] md:py-[30px] 
        lg:text-[28px] lg:px-[120px] lg:py-[45px] 
        ${service.className}`}
    >
      <a
        href={service.link}
        className="no-underline whitespace-nowrap text-ellipsis text-[#252525] overflow-hidden font-urbanist font-bold"
      >
        {service.name}
      </a>
    </div>
  </div>
))}


                  
                      </div>
                  </div>
                  
                  
              </div>
      </div>
    </section >
  )
}

export default ServicesSection
