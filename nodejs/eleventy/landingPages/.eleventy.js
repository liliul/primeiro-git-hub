const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const { minify } = require("terser");

module.exports = function (eleventyConfig) {
  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV === "production" &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  // Tell Eleventy to process CSS and JS files
  eleventyConfig.setTemplateFormats(["html", "njk", "md", "css"]);

  // Pass through fonts and images
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("assets");
  
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "dist",
    },
  };
};
