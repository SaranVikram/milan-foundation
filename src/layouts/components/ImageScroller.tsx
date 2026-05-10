"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { SectionHeading } from "@/shortcodes/SectionHeading"


const projects = [
  {
    title: "Project Alpha",
    tags: ["Web Design", "Development"],
    src: "/images/placeholder-project.png",
    href: "#",
  },
  {
    title: "Project Beta",
    tags: ["Branding", "UI/UX"],
    src: "/images/placeholder-project.png",
    href: "#",
  },
  {
    title: "Project Gamma",
    tags: ["E-Commerce", "Development"],
    src: "/images/placeholder-project.png",
    href: "#",
  },
  {
    title: "Project Delta",
    tags: ["Marketing", "SEO"],
    src: "/images/placeholder-project.png",
    href: "#",
  },
  {
    title: "Project Epsilon",
    tags: ["Mobile", "Design"],
    src: "/images/placeholder-project.png",
    href: "#",
  },
]


const Card = ({
  i,
  title,
  src,
  href,
  tags,
  progress,
  range,
  targetScale,
}: {
  i: number
  title: string
  src: string
  href: string
  tags: string[]
  progress: any
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-[50vh] md:h-[80vh] flex items-center justify-center sticky top-[25vh] md:top-0">
      <motion.div
        style={{
          scale,

        }}
        className="relative h-auto w-full sm:w-[90%] max-w-[1200px] rounded-3xl overflow-hidden origin-top"
      >
        <motion.div className="relative w-full h-[210px] sm:h-[300px] md:h-[600px]">
          <Image
            src={src}
            alt={title}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="w-full h-full object-cover object-top rounded-3xl"
            priority={i === 0}
            decoding="async"
          />
        </motion.div>

        {/* Card Overlay at Bottom Left */}
        <div className="absolute bottom-0 left-0 flex gap-0 max-w-md">
          <div className="bg-[#ffeaa1] p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col gap-1 sm:gap-2 justify-center">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#252525]">
              {title}
            </h2>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/30 text-[#252525] text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="bg-[#c68eff] flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-6 lg:px-8">
            <a className="flex items-center justify-center" href={href} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                fill="none"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-[#252525]"
              >
                <path
                  d="M56.5878 78.5116V40.9842V39.7863L55.7362 40.6287L18.5784 77.3826L2.56463 61.3689L39.3186 24.211L40.1609 23.3594H38.9631H1.43562L24.0841 0.710938H79.2363V55.8632L56.5878 78.5116Z"
                  stroke="#270E40"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const ImageScroller = () => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={container} className="relative pt-4 md:pt-8 w-full bg-[#250D3E] ">
      <SectionHeading text="Our Projects" color={{ name: "white", hex: "#fff" }} />
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.05)
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </section>
  )
}

export { ImageScroller }