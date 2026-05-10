import React from "react";
import Link from "next/link";

interface CreativeSectionHeaderProps {
  title: string;
  description?: string;

}

export const PageHero: React.FC<CreativeSectionHeaderProps> = ({
  title,
  description,

}) => {


  return (
    <section className=" pt-16 md:pt-24 lg:pt-36 flex items-center justify-center bg-primary overflow-hidden">
      <div className="container box-border">
        {/* Decorative background shapes */}
        {/* Colored bar with shadow */}

        <div className=" hero ">
          <h1 className="font-bold text-white ">
            {title}
          </h1>
          {description && (
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-3xl mx-auto">
              {description.split(/(\[.*?\]\(.*?\))/g).map((part, index) => {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <Link
                      key={index}
                      href={match[2]}
                      className="underline decoration-white/50 hover:decoration-white transition-all underline-offset-4"
                    >
                      {match[1]}
                    </Link>
                  );
                }
                return part;
              })}
            </p>
          )}

        </div>



      </div>
    </section>
  );
};