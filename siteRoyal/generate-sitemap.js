import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";

const sitemap = new SitemapStream({
  hostname: "https://www.royalapart.online",
});

const pages = [
  { url: "/en", changefreq: "daily", priority: 0.8 },
  { url: "/uk", changefreq: "daily", priority: 0.8 },
  // Add other important pages of your site
];

pages.forEach((page) => sitemap.write(page));

sitemap.end();

streamToPromise(sitemap)
  .then((data) =>
    createWriteStream(path.join("./", "public", "sitemap.xml")).write(data)
  )
  .catch((err) => console.error(err));
