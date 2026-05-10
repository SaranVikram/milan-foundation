import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, light = false }) => {
  return (
    <div className="text-center mb-16">
      <h2 className={`text-4xl font-bebas tracking-wider ${light ? 'text-white' : 'text-slate-900'} mb-4 uppercase`}>
        {title}
      </h2>
      <div 
        className="w-20 h-1.5 mx-auto mb-6" 
        style={{ background: 'linear-gradient(90deg, #72BE44 0%, #7DC657 100%)' }}
      ></div>
      {description && (
        <p className={`${light ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto text-lg font-raleway`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
