module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("main.js");
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
