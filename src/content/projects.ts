// projects.ts — Sample project data for the starter template

export type Project = {
  title: string;
  src: string;
  alt: string;
  subtitle?: string;
};

export const projects: Project[] = [
  {
    title: "Project Alpha",
    src: "/images/placeholder-project.png",
    alt: "Project Alpha showcase",
    subtitle: "A modern web application built with Next.js",
  },
  {
    title: "Project Beta",
    src: "/images/placeholder-project.png",
    alt: "Project Beta showcase",
    subtitle: "Brand identity and design system",
  },
  {
    title: "Project Gamma",
    src: "/images/placeholder-project.png",
    alt: "Project Gamma showcase",
    subtitle: "Full-stack e-commerce platform",
  },
  {
    title: "Project Delta",
    src: "/images/placeholder-project.png",
    alt: "Project Delta showcase",
    subtitle: "Mobile-first responsive design",
  },
];
