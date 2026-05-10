import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegFolder, FaRegUserCircle, FaArrowRight } from "react-icons/fa";

const BlogCard = ({ data }: { data: Post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { title, image, author, categories, date } = data.frontmatter;

  return (
    <div className="group h-full flex flex-col bg-white rounded-[32px] border-2 border-[#252525] p-5 shadow-[8px_8px_0_0_#252525] transition-all hover:shadow-[4px_4px_0_0_#252525] hover:translate-x-[4px] hover:translate-y-[4px]">
      {image && (
        <div className="relative overflow-hidden rounded-[20px] mb-5 aspect-[16/9]">
          <ImageFallback
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={title}
            width={445}
            height={230}
          />
        </div>
      )}

      <div className="flex flex-col flex-1">
        <ul className="mb-3 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <li className="flex items-center gap-1.5">
            <FaRegUserCircle className="text-primary" />
            <span>{humanize(author)}</span>
          </li>
          {date && <li>{dateFormat(date)}</li>}
        </ul>

        <h3 className="mb-4 text-xl font-bold leading-tight text-[#252525] group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/${blog_folder}/${data.slug}`}>{title}</Link>
        </h3>

        <p className="mb-6 text-gray-500 text-sm leading-relaxed line-clamp-3">
          {plainify(data.content!.slice(0, Number(summary_length)))}...
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {categories?.slice(0, 1).map((category: string, index: number) => (
              <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-tight text-gray-600">
                {humanize(category)}
              </span>
            ))}
          </div>

          <Link
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#186FD6] text-white shadow-[3px_3px_0_0_#252525] transition-all hover:shadow-[1px_1px_0_0_#252525] hover:translate-x-[1px] hover:translate-y-[1px]"
            href={`/${blog_folder}/${data.slug}`}
            aria-label="Read More"
          >
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
