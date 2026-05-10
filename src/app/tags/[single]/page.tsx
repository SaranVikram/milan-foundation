import BlogCard from "@/components/BlogCard";
import config from "@/config/config.json";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import { PageHero } from "@/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";

const { blog_folder } = config.settings;
type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const tags = getTaxonomy(blog_folder, "tags");

  const paths = tags.map((tag) => ({
    single: tag,
  }));

  return paths;
};

const TagSingle = ({ params }: { params: { single: string } }) => {
  const posts: Post[] = getSinglePage(blog_folder);
  const filterByTags = taxonomyFilter(posts, "tags", params.single);

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHero title={humanize(params.single)} />
      <section className="section bg-white pt-12 md:pt-20">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="row g-4">
                {filterByTags.map((post: Post, index: number) => (
                  <div className="mb-8 md:col-6 lg:col-4" key={index}>
                    <BlogCard data={post} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TagSingle;
