import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const SEO = ({
  // Basic Meta
  title = "Netai Stationery Works | Premium Stationery Manufacturer India",
  description = "Netai Stationery Works Pvt. Ltd. - Leading manufacturer of premium notebooks, journals, and custom stationery in India. Bulk manufacturing, corporate gifting, and custom printing services.",
  keywords = "stationery manufacturer India, notebooks wholesale, custom notebooks, journal manufacturer, bulk stationery, corporate stationery, paper products, Kolkata stationery",
  author = "Netai Stationery Works Pvt. Ltd.",
  
  // Canonical URL
  canonical = null,
  
  // Language & Region
  language = "en",
  geoRegion = "IN",
  geoPlacename = "Kolkata",
  geoPosition = "22.5726;88.3639",
  
  // Open Graph (Facebook, LinkedIn)
  ogTitle = null,
  ogDescription = null,
  ogImage = "/images/og-image.jpg",
  ogImageAlt = "Netai Stationery Works - Premium Stationery Manufacturing",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  ogType = "website",
  ogSiteName = "Netai Stationery Works",
  ogLocale = "en_IN",
  
  // Twitter Card
  twitterCard = "summary_large_image",
  twitterSite = "@netai_stationery",
  twitterCreator = "@netai_stationery",
  twitterTitle = null,
  twitterDescription = null,
  twitterImage = "/images/twitter-card.jpg",
  twitterImageAlt = "Netai Stationery Works - Quality Paper Products",
  
  // Article Specific (for blog/product pages)
  articlePublishedTime = null,
  articleModifiedTime = null,
  articleSection = null,
  articleTags = [],
  
  // Product Specific
  productPrice = null,
  productCurrency = "INR",
  productAvailability = "https://schema.org/InStock",
  productCondition = "https://schema.org/NewCondition",
  
  // Structured Data Type
  schemaType = "Organization", // Organization, Product, Article, BreadcrumbList, FAQPage
  
  // Additional Meta
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  googlebot = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  bingbot = "index, follow",
  
  // Verification
  googleSiteVerification = "your-google-verification-code",
  bingSiteVerification = null,
  yandexVerification = null,
  pinterestVerification = null,
  
  // Preconnect & Prefetch
  preconnectUrls = [],
  prefetchUrls = [],
  preloadAssets = [],
  
  // No Index Override
  noIndex = false,
  
  // Children for additional meta tags
  children = null,
}) => {
  const location = useLocation();
  const currentUrl = canonical || `${window.location.origin}${location.pathname}`;
  const currentYear = new Date().getFullYear();
  
  // Default fallback values
  const finalTitle = title;
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  
  // Robots override
  const finalRobots = noIndex ? "noindex, nofollow" : robots;

  // Structured Data Generation
  const generateStructuredData = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${window.location.origin}/#organization`,
      "name": "Netai Stationery Works Pvt. Ltd.",
      "legalName": "Netai Stationery Works Private Limited",
      "alternateName": ["NSWPL", "Netai Stationery"],
      "url": window.location.origin,
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/images/logo.png`,
        "width": "512",
        "height": "512",
      },
      "image": `${window.location.origin}/images/og-image.jpg`,
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "14 B, Patwar Bagan Lane, Sealdah",
        "addressLocality": "Kolkata",
        "addressRegion": "West Bengal",
        "postalCode": "700009",
        "addressCountry": "IN",
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-98307-70400",
          "contactType": "customer service",
          "email": "nswplsaha@yahoo.com",
          "availableLanguage": ["English", "Hindi", "Bengali"],
          "areaServed": "IN",
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-70441-89887",
          "contactType": "sales",
          "email": "sales@nswpl.com",
          "availableLanguage": ["English", "Hindi", "Bengali"],
          "areaServed": "IN",
        },
      ],
      "sameAs": [
        "https://www.facebook.com/netai.stationery",
        "https://www.instagram.com/netai_stationery",
        "https://www.linkedin.com/company/netai-stationery-works",
        "https://twitter.com/netai_stationery",
      ],
      "foundingDate": "2009",
      "founder": {
        "@type": "Person",
        "name": "Adhir Kumar Saha",
      },
      "taxID": "19AACCN1563G1ZI",
      "vatID": "19AACCN1563G1ZI",
      "areaServed": [
        {
          "@type": "Country",
          "name": "India",
        },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Stationery Products",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Custom Notebooks",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Corporate Stationery",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Bulk Manufacturing",
            },
          },
        ],
      },
    };

    const baseWebsite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${window.location.origin}/#website`,
      "url": window.location.origin,
      "name": "Netai Stationery Works",
      "description": description,
      "publisher": {
        "@id": `${window.location.origin}/#organization`,
      },
      "inLanguage": language,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    const baseBreadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin,
        },
      ],
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": finalTitle,
      "description": description,
      "image": ogImage,
      "brand": {
        "@type": "Brand",
        "name": "Netai Stationery Works",
      },
      "manufacturer": {
        "@id": `${window.location.origin}/#organization`,
      },
      "offers": {
        "@type": "Offer",
        "url": currentUrl,
        "priceCurrency": productCurrency,
        "price": productPrice,
        "availability": productAvailability,
        "itemCondition": productCondition,
        "priceValidUntil": `${currentYear + 1}-12-31`,
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "INR",
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN",
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY",
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 7,
              "unitCode": "DAY",
            },
          },
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnByMail",
        },
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "156",
        "bestRating": "5",
        "worstRating": "1",
      },
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": finalTitle,
      "description": description,
      "image": ogImage,
      "author": {
        "@type": "Organization",
        "name": "Netai Stationery Works",
        "url": window.location.origin,
      },
      "publisher": {
        "@id": `${window.location.origin}/#organization`,
      },
      "datePublished": articlePublishedTime,
      "dateModified": articleModifiedTime || articlePublishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl,
      },
      "articleSection": articleSection,
      "keywords": articleTags.join(", "),
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of stationery products do you manufacture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We manufacture a wide range of stationery including notebooks, journals, diaries, notepads, exercise books, custom corporate stationery, and bulk paper products for educational institutions and businesses.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you offer custom printing and branding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialize in custom printing and branding services. We can print your company logo, design, or custom artwork on notebooks, journals, and other stationery items with high-quality offset and digital printing.",
          },
        },
        {
          "@type": "Question",
          "name": "What is your minimum order quantity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our minimum order quantity varies by product. For custom printed notebooks, MOQ starts from 500 pieces. For bulk manufacturing of standard products, MOQ can be as low as 1000 units. Contact our sales team for specific requirements.",
          },
        },
        {
          "@type": "Question",
          "name": "Where do you deliver?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We deliver across all states in India. International shipping is available for bulk orders upon request. Delivery timelines vary by location and order volume.",
          },
        },
        {
          "@type": "Question",
          "name": "What payment methods do you accept?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accept bank transfers (NEFT/RTGS), UPI payments, corporate checks, and credit terms for approved business accounts with purchase orders.",
          },
        },
      ],
    };

    switch (schemaType) {
      case "Product":
        return [baseOrganization, baseWebsite, baseBreadcrumb, productSchema];
      case "Article":
        return [baseOrganization, baseWebsite, baseBreadcrumb, articleSchema];
      case "FAQPage":
        return [baseOrganization, baseWebsite, baseBreadcrumb, faqSchema];
      case "BreadcrumbList":
        return [baseOrganization, baseWebsite, baseBreadcrumb];
      default:
        return [baseOrganization, baseWebsite];
    }
  };

  const structuredData = generateStructuredData();

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <html lang={language} />
        <title>{finalTitle}</title>
        <meta name="title" content={finalTitle} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="copyright" content={`© ${currentYear} ${author}`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Language & Region */}
        <meta name="language" content={language} />
        <meta name="geo.region" content={geoRegion} />
        <meta name="geo.placename" content={geoPlacename} />
        <meta name="geo.position" content={geoPosition} />
        <meta name="ICBM" content={geoPosition} />
        
        {/* Robots Control */}
        <meta name="robots" content={finalRobots} />
        <meta name="googlebot" content={googlebot} />
        <meta name="bingbot" content={bingbot} />
        
        {/* Site Verification */}
        {googleSiteVerification && (
          <meta name="google-site-verification" content={googleSiteVerification} />
        )}
        {bingSiteVerification && (
          <meta name="msvalidate.01" content={bingSiteVerification} />
        )}
        {yandexVerification && (
          <meta name="yandex-verification" content={yandexVerification} />
        )}
        {pinterestVerification && (
          <meta name="p:domain_verify" content={pinterestVerification} />
        )}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={finalOgTitle} />
        <meta property="og:description" content={finalOgDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content={ogImageWidth} />
        <meta property="og:image:height" content={ogImageHeight} />
        <meta property="og:site_name" content={ogSiteName} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:image:secure_url" content={ogImage} />
        
        {/* Article Specific Open Graph */}
        {articlePublishedTime && (
          <meta property="article:published_time" content={articlePublishedTime} />
        )}
        {articleModifiedTime && (
          <meta property="article:modified_time" content={articleModifiedTime} />
        )}
        {articleSection && (
          <meta property="article:section" content={articleSection} />
        )}
        {articleTags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Product Specific Open Graph */}
        {productPrice && (
          <>
            <meta property="product:price:amount" content={productPrice} />
            <meta property="product:price:currency" content={productCurrency} />
            <meta property="product:availability" content={productAvailability} />
            <meta property="product:condition" content={productCondition} />
          </>
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:site" content={twitterSite} />
        <meta name="twitter:creator" content={twitterCreator} />
        <meta name="twitter:title" content={finalTwitterTitle} />
        <meta name="twitter:description" content={finalTwitterDescription} />
        <meta name="twitter:image" content={twitterImage} />
        <meta name="twitter:image:alt" content={twitterImageAlt} />
        
        {/* Mobile & Theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#E09C27" />
        <meta name="msapplication-TileColor" content="#E09C27" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Apple Meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NSWPL" />
        
        {/* Preconnect & Prefetch */}
        {preconnectUrls.map((url, index) => (
          <link key={`preconnect-${index}`} rel="preconnect" href={url} crossOrigin="anonymous" />
        ))}
        {prefetchUrls.map((url, index) => (
          <link key={`prefetch-${index}`} rel="prefetch" href={url} as="document" />
        ))}
        {preloadAssets.map((asset, index) => (
          <link
            key={`preload-${index}`}
            rel="preload"
            href={asset.url}
            as={asset.as}
            type={asset.type}
            crossOrigin={asset.crossOrigin}
          />
        ))}
        
        {/* Structured Data */}
        {structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data, null, 2)}
          </script>
        ))}
        
        {/* Additional Custom Meta Tags */}
        {children}
      </Helmet>
    </HelmetProvider>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  canonical: PropTypes.string,
  language: PropTypes.string,
  geoRegion: PropTypes.string,
  geoPlacename: PropTypes.string,
  geoPosition: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  ogImageAlt: PropTypes.string,
  ogImageWidth: PropTypes.string,
  ogImageHeight: PropTypes.string,
  ogType: PropTypes.string,
  ogSiteName: PropTypes.string,
  ogLocale: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterSite: PropTypes.string,
  twitterCreator: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterImage: PropTypes.string,
  twitterImageAlt: PropTypes.string,
  articlePublishedTime: PropTypes.string,
  articleModifiedTime: PropTypes.string,
  articleSection: PropTypes.string,
  articleTags: PropTypes.array,
  productPrice: PropTypes.string,
  productCurrency: PropTypes.string,
  productAvailability: PropTypes.string,
  productCondition: PropTypes.string,
  schemaType: PropTypes.string,
  robots: PropTypes.string,
  googlebot: PropTypes.string,
  bingbot: PropTypes.string,
  googleSiteVerification: PropTypes.string,
  bingSiteVerification: PropTypes.string,
  yandexVerification: PropTypes.string,
  pinterestVerification: PropTypes.string,
  preconnectUrls: PropTypes.array,
  prefetchUrls: PropTypes.array,
  preloadAssets: PropTypes.array,
  noIndex: PropTypes.bool,
  children: PropTypes.node,
};

export default SEO;