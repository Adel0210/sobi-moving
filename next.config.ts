import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve SEO equity from the previous site's indexed URLs by 301-redirecting
  // the old .php/.html paths to their new equivalents.
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home.php", destination: "/", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/services.php", destination: "/services", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/quote.php", destination: "/quote", permanent: true },
      { source: "/quote.html", destination: "/quote", permanent: true },
      { source: "/senior-moving.php", destination: "/senior-moving", permanent: true },
      { source: "/senior.php", destination: "/senior-moving", permanent: true },
      // Legacy pages that had no new equivalent were returning 403 and bleeding
      // the impressions they still earn — point them at the closest live page.
      { source: "/materials.php", destination: "/services", permanent: true },
      { source: "/reviews.php", destination: "/about", permanent: true },
      { source: "/blog.php", destination: "/blog", permanent: true },
      { source: "/gallery.php", destination: "/about", permanent: true },
      { source: "/faq.php", destination: "/", permanent: true },
      { source: "/testimonials.php", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
