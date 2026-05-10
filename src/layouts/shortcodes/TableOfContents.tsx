import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface Heading {
    text: string;
    id: string;
    level?: number;
}

interface TableOfContentsProps {
    headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
    if (!headings || headings.length === 0) return null;

    return (
        <div className="toc-container mb-8 p-6 rounded-2xl border border-border bg-theme-light dark:border-darkmode-border dark:bg-darkmode-theme-light not-prose shadow-sm">
            <p className="mb-4 text-lg font-bold text-dark dark:text-darkmode-dark border-b border-border dark:border-darkmode-border pb-2">
                Table of Contents
            </p>
            <nav aria-label="Table of Contents">
                <ul className="space-y-2">
                    {headings.map((heading, index) => (
                        <li
                            key={index}
                            className={clsx(
                                "text-sm transition-colors duration-200",
                                (heading.level === 3 || heading.level === undefined) && "pl-4"
                            )}
                        >
                            <Link
                                href={`#${heading.id}`}
                                className="block py-1 text-text hover:text-primary dark:text-darkmode-text dark:hover:text-darkmode-primary"
                            >
                                {heading.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default TableOfContents;
