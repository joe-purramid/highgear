import { HtmlBasePlugin } from "@11ty/eleventy";
import Image from "@11ty/eleventy-img";
import sharp from "sharp";

export default function (eleventyConfig) {
  // Rewrites root-relative URLs ("/about/") to include the path prefix, so the
  // same templates work at <user>.github.io/<repo>/ and at a custom domain.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  // Self-hosted fonts (latin + latin-ext subsets only).
  for (const file of [
    "limelight/files/limelight-latin-400-normal.woff2",
    "limelight/files/limelight-latin-ext-400-normal.woff2",
    "dm-sans/files/dm-sans-latin-400-normal.woff2",
    "dm-sans/files/dm-sans-latin-600-normal.woff2",
    "dm-sans/files/dm-sans-latin-700-normal.woff2",
    "dm-sans/files/dm-sans-latin-ext-400-normal.woff2",
    "dm-sans/files/dm-sans-latin-ext-600-normal.woff2",
    "dm-sans/files/dm-sans-latin-ext-700-normal.woff2",
  ]) {
    eleventyConfig.addPassthroughCopy({
      [`node_modules/@fontsource/${file}`]: `fonts/${file.split("/").pop()}`,
    });
  }

  // Responsive image: AVIF + WebP + JPEG/PNG fallback, width/height always set.
  // Usage: {% image "src/images/group.jpg", "Alt text", "(min-width: 1024px) 50vw, 100vw" %}
  // Fifth argument options:
  //   eager: true                   for images visible on load
  //   crop: { left, top, size }     cut a square (or { left, top, width,
  //                                 height } for any rectangle) from the source
  //                                 first, in its own pixels (used for portraits)
  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, sizes = "100vw", widths = [400, 800, 1200, 1600], options = {}) {
      if (alt === undefined) throw new Error(`Missing alt text for image: ${src}`);
      const { crop } = options;
      // eleventy-img names output files by a hash of the input, so each crop's
      // buffer gets its own files.
      const input = crop
        ? await sharp(src)
            .extract({
              left: crop.left,
              top: crop.top,
              width: crop.width ?? crop.size,
              height: crop.height ?? crop.size,
            })
            .toBuffer()
        : src;
      const metadata = await Image(input, {
        widths: [...widths, "auto"],
        formats: ["avif", "webp", "auto"],
        outputDir: "./_site/img/",
        urlPath: "/img/",
      });
      return Image.generateHTML(metadata, {
        alt,
        sizes,
        loading: options.eager ? "eager" : "lazy",
        decoding: "async",
        ...(options.eager ? { fetchpriority: "high" } : {}),
      });
    }
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
