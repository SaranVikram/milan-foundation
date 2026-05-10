export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
export type Branch = {
  location: string;
  phone2: string;
  address: string;
  googleMaps: string;
  facebook: string;
  instagram: string;
};
export type Service = {
  slug: string; // Unique identifier for the service, usually derived from the filename
  frontmatter: {
    title: string; // Title of the service
    meta_title: string; // SEO meta title
    description: string; // Short description of the service for SEO
    image: string; // URL or path to the image representing the service
    // Add any other fields that you have in your markdown frontmatter
  };
  content: string; // The actual content of the markdown file
};
