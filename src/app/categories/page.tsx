import config from "@/config/config.json";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { humanize } from "@/lib/utils/textConverter";
import { PageHero } from "@/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";

const Categories = () => {
  const { blog_folder } = config.settings;
  const categories = getTaxonomy(blog_folder, "categories");
  const allCategories = getAllTaxonomy(blog_folder, "categories");

  return (
    <>
      <SeoMeta title={"Categories"} />
      <PageHero title={"Categories"} />
      <section className="section bg-white pt-12 md:pt-20">
        <div className="container text-center">
          <ul className="flex flex-wrap justify-center gap-4">
            {categories.map((category: string) => {
              const count = allCategories.filter(
                (c: string) => c === category,
              ).length;
              return (
                <li className="inline-block" key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className="flex items-center rounded-lg bg-gray-50 border border-gray-100 px-6 py-3 text-lg font-medium text-gray-700 transition hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                  >
                    {humanize(category)}{" "}
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

export default Categories;
