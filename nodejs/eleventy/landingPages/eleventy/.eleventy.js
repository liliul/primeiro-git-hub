module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "dist"
    }
  };
};