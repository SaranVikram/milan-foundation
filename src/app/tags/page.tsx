import config from "@/config/config.json";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { humanize } from "@/lib/utils/textConverter";
import { PageHero } from "@/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const tags = () => {
  const { blog_folder } = config.settings;
  const tags = getTaxonomy(blog_folder, "tags");
  const alltags = getAllTaxonomy(blog_folder, "tags");

  return (
    <>
      <SeoMeta title={"Tags"} />
      <PageHero title={"Tags"} />
      <section className="section bg-white pt-12 md:pt-20">
        <div className="container text-center">
          <ul className="flex flex-wrap justify-center gap-4">
            {tags.map((tag: string) => {
              const count: number = alltags.filter(
                (c: string) => c === tag,
              ).length;
              return (
                <li className="inline-block" key={tag}>
                  <Link
                    href={`/tags/${tag}`}
                    className="flex items-center rounded-lg bg-gray-50 border border-gray-100 px-6 py-3 text-lg font-medium text-gray-700 transition hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                  >
                    {humanize(tag)}
                    <span className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-gray-500 shadow-sm">
                      {count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default tags;
