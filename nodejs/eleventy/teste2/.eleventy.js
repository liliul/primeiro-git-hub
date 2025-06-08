module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/js");
  // eleventyConfig.addPassthroughCopy({ "src/pages": "pages" });
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes"
    }
  };
};
