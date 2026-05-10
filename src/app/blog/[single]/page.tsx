import BlogCard from "@/components/BlogCard";
import Disqus from "@/components/Disqus";
import Share from "@/components/Share";
import config from "@/config/config.json";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import similerItems from "@/lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegClock, FaRegFolder, FaRegUserCircle } from "react-icons/fa";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/Cta";

const { blog_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage(blog_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const PostSingle = ({ params }: { params: { single: string } }) => {
  const posts: Post[] = getSinglePage(blog_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image,
    author,
    categories,
    date,
    tags,
  } = frontmatter;
  const similarPosts = similerItems(post, posts, post.slug!);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <PageHero title={title} description={description} />

      <section className="section bg-white pt-12 md:pt-20">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-12">
              {/* Blog Metadata */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-6 border-b border-gray-100 pb-8 text-sm text-gray-500 md:text-base">
                <div className="flex items-center gap-2">
                  <FaRegUserCircle className="text-primary" />
                  <Link href={`/authors/${slugify(author)}`} className="hover:text-primary transition-colors">
                    {humanize(author)}
                  </Link>
                </div>
                {date && (
                  <div className="flex items-center gap-2">
                    <FaRegClock className="text-primary" />
                    <span>{dateFormat(date)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FaRegFolder className="text-primary" />
                  <div className="flex gap-1">
                    {categories?.map((category: string, index: number) => (
                      <Link
                        key={category}
                        href={`/categories/${slugify(category)}`}
                        className="hover:text-primary transition-colors"
                      >
                        {humanize(category)}
                        {index !== categories.length - 1 && ", "}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="content mb-16 prose prose-lg max-w-none">
                <MDXContent content={content} />
              </div>

              {/* Tags and Share */}
              <div className="mb-16 rounded-2xl bg-gray-50 p-8 md:flex md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  <h5 className="mb-3 text-lg font-bold">Tags</h5>
                  <ul className="flex flex-wrap gap-2">
                    {tags?.map((tag: string) => (
                      <li key={tag}>
                        <Link
                          className="rounded-full bg-white px-4 py-1.5 text-sm transition-all hover:bg-primary hover:text-white"
                          href={`/tags/${slugify(tag)}`}
                        >
                          {humanize(tag)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="mb-3 text-lg font-bold">Share This Post</h5>
                  <Share
                    className="social-icons"
                    title={title}
                    description={description}
                    slug={post.slug!}
                  />
                </div>
              </div>

              <Disqus className="mt-20 border-t border-gray-100 pt-10" />
            </article>
          </div>
        </div>

        {/* Related posts */}
        <div className="bg-theme-light/30 border-t border-gray-100 py-20 mt-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Related Posts</h2>
            <div className="row justify-center">
              {similarPosts.length > 0 ? (
                similarPosts.slice(0, 3).map((post) => (
                  <div key={post.slug} className="mb-8 md:col-6 lg:col-4">
                    <BlogCard data={post} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No related posts found.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
};

export default PostSingle;
