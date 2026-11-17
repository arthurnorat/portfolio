// Eleventy configuration: pages live in src/, the built site goes to _site/.
export default function (eleventyConfig) {
  // Files copied as-is to the output (paths relative to the project root).
  eleventyConfig.addPassthroughCopy({
    "style.css": "style.css",
    "assets": "assets",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
