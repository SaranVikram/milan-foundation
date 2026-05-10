"use client";

import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import { usePathname } from "next/navigation";
import React from "react";
// CHANGED: Removed Offer, we don't need it
import { WithContext, Service, Thing } from "schema-dts";

// NEW: Define a simple service type.
// We will pass an array of these.
type SimpleServiceData = {
  name: string; // e.g., "WordPress Development"
  serviceType: string; // e.g., "Web Development"
  description: string;
  areaServedName: string; // e.g., "Vijayawada"
};

type SeoMetaProps = {
  title?: string;
  meta_title?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  locale?: string;
  alternateLocales?: string[];
  siteName?: string;
  twitterSite?: string;
  twitterCreator?: string;
  orgLogo?: string;
  sameAs?: string[];
  enableSearchAction?: boolean;
  // CHANGED: This prop is now an array of our simple service type
  // CHANGED: This prop is now an array of our simple service type
  serviceSchema?: SimpleServiceData[];
  schema?: WithContext<Thing> | WithContext<Thing>[];
};

function joinUrl(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

const SeoMeta = ({
  title,
  meta_title,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  description,
  canonical,
  noindex,
  locale = "en_IN",
  alternateLocales = [],
  siteName,
  twitterSite,
  twitterCreator,
  orgLogo = "/images/logo.png",
  sameAs = [],
  enableSearchAction = false,
  // This is now an array, e.g., [service1, service2]
  // This is now an array, e.g., [service1, service2]
  serviceSchema,
  schema,
}: SeoMetaProps) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname();

  const pageTitle = plainify(
    meta_title ? meta_title : title ? title : config.site.title,
  );
  const pageDesc = plainify(description ? description : meta_description);
  const siteLabel = siteName || config.site.title;
  const fullUrl = canonical ? canonical : joinUrl(base_url, pathname || "/");
  const imgUrl = image ? image : meta_image;
  const imgAlt = plainify(imageAlt ? imageAlt : pageTitle);
  const orgId = `${base_url}#organization`;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteLabel,
    url: base_url,
    logo: orgLogo,
    description: pageDesc,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteLabel,
    url: base_url,
    potentialAction: enableSearchAction
      ? {
        "@type": "SearchAction",
        target: `${base_url}/search?q={query}`,
        "query-input": "required name=query",
      }
      : undefined,
  };

  // ---
  // CHANGED: Build an array of Service JSON-LD objects
  // ---
  let serviceJsonLdArray: WithContext<Service>[] = [];
  if (serviceSchema && serviceSchema.length > 0) {
    // We map over the array of services passed in the props
    serviceJsonLdArray = serviceSchema.map(
      (service): WithContext<Service> => ({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        provider: {
          "@type": "Organization",
          "@id": orgId,
        },
        areaServed: {
          "@type": "Place",
          name: service.areaServedName,
        },
      }),
    );
  }

  return (
    <>
      {/* ... (all your <title>, <link canonical>, <meta>, etc. tags) ... */}
      <title>{pageTitle}</title>
      <link rel="canonical" href={fullUrl} itemProp="url" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta name="description" content={pageDesc} />
      <meta name="author" content={meta_author} />
      <meta name="robots" content="max-image-preview:large" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteLabel} />
      <meta property="og:locale" content={locale} />
      {alternateLocales.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:alt" content={imgAlt} />
      {imageWidth && (
        <meta property="og:image:width" content={String(imageWidth)} />
      )}
      {imageHeight && (
        <meta property="og:image:height" content={String(imageHeight)} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:image:alt" content={imgAlt} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && (
        <meta name="twitter:creator" content={twitterCreator} />
      )}
      <meta name="twitter:url" content={fullUrl} />

      {/* --- JSON-LD Scripts --- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* CHANGED: We now map over the array and render a script for each service */}
      {serviceJsonLdArray.length > 0 &&
        serviceJsonLdArray.map((schema, index) => (
          <script
            key={`service-schema-${index}`} // Add a key for React
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      {/* Generic Schema Injection */}
      {schema && (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
        <script
          key={`custom-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
};

export default SeoMeta;