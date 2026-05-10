import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

const contentPath = "src/content";

// Helper function to read file content
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

// get all single pages, ex: blog/post.md
export const getListPage = (filePath: string) => {
  const pageDataPath = path.join(contentPath, filePath);

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    frontmatter: parseFrontmatter(frontmatter),
    content,
  };
};

export const getSinglePage = (folder: string) => {
  const folderPath = path.join(contentPath, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    return [];
  }

  const items = fs.readdirSync(folderPath);

  // 1. Directories (e.g. blog posts)
  const postDirectories = items.filter((item) => {
    const itemPath = path.join(folderPath, item);
    return fs.lstatSync(itemPath).isDirectory();
  });

  const directoryPages = postDirectories.map((slug) => {
    const dirPath = path.join(folderPath, slug);
    const possibleFiles = ["page.mdx", "page.md", "index.mdx", "index.md"];
    const contentFile = possibleFiles.find((file) =>
      fs.existsSync(path.join(dirPath, file))
    );

    if (!contentFile) return null;

    const filePath = path.join(dirPath, contentFile);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return {
      frontmatter: parseFrontmatter(frontmatter),
      slug: url,
      content,
    };
  });

  // 2. Flat Files (e.g. privacy-policy.md)
  const flatFiles = items.filter(
    (item) => item.endsWith(".md") && !item.startsWith("_")
  );

  const filePages = flatFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(folderPath, filename);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return {
      frontmatter: parseFrontmatter(frontmatter),
      slug: url,
      content,
    };
  });

  const allPages = [...directoryPages, ...filePages];

  // Filter out nulls and apply other filters
  const validPages = allPages.filter(
    (page): page is NonNullable<typeof page> => page !== null
  );

  const publishedPages = validPages.filter(
    (page) => !page.frontmatter.draft && page,
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date(),
  );

  return filterByDate;
};
