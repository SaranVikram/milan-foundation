import React from 'react';

interface ComparisonTableProps {
    headers: string[];
    rows: (string | boolean)[][];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ headers, rows }) => {
    return (
        <div className="overflow-x-auto my-8 rounded-xl border border-border dark:border-darkmode-border shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-theme-light dark:bg-darkmode-theme-light">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 font-bold text-dark dark:text-darkmode-dark uppercase tracking-wider text-xs first:pl-6 last:pr-6"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-darkmode-border bg-body dark:bg-darkmode-body">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-theme-light/50 dark:hover:bg-darkmode-theme-light/50 transition-colors">
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-6 py-4 text-text dark:text-darkmode-text whitespace-nowrap first:font-medium first:text-dark dark:first:text-darkmode-dark"
                                >
                                    {typeof cell === 'boolean' ? (
                                        cell ? (
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100/50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100/50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                        )
                                    ) : (
                                        cell
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
