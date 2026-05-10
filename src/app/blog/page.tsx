import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/Cta";

const { blog_folder, pagination } = config.settings;

const Posts = () => {
  const postIndex: Post = getListPage(`${blog_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(blog_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

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
            <div className="lg:col-10">
              <div className="row g-4">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-8 md:col-6 lg:col-4">
                    <BlogCard data={post} />
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center border-t border-gray-100 pt-12">
                <Pagination
                  section={blog_folder}
                  currentPage={1}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
};

export default Posts;
