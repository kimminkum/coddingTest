import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
}

const Seo: React.FC<SEOProps> = ({ title, description, keywords }) => {
  return (
    <div>
      <div>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        {/* Add more meta tags as needed */}
      </div>
    </div>
  );
};

export default Seo;
