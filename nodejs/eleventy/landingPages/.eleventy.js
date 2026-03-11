const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const fs = require("fs");

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

  eleventyConfig.addNunjucksAsyncFilter("cssmin", async function (filePath, callback) {
    try {
      const css = fs.readFileSync(filePath, "utf8");
      const minified = new CleanCSS({}).minify(css).styles;
      callback(null, minified);
    } catch (err) {
      console.error(err);
      callback(null, "");
    }
  });
  
  eleventyConfig.addWatchTarget("./css/");
  
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

  eleventyConfig.addWatchTarget("./js/src/");
  eleventyConfig.watchIgnores.add("./js/main.js");

  // Tell Eleventy to process CSS and JS files
  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);

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
