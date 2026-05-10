import AuthorCard from "@/components/AuthorCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { PageHero } from "@/components/PageHero";
import SeoMeta from "@/partials/SeoMeta";
import { Author } from "@/types";

const Authors = () => {
  const authorIndex: Author = getListPage("authors/_index.md");
  const authors: Author[] = getSinglePage("authors");
  const { title, meta_title, description, image } = authorIndex.frontmatter;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHero title={title} />
      <section className="section bg-white pt-12 md:pt-20">
        <div className="container">
          <div className="row justify-center">
            {authors.map((author: Author, index: number) => (
              <div className="mb-8 md:col-6 lg:col-4" key={index}>
                <AuthorCard data={author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Authors;
