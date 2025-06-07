// .eleventy.js
module.exports = function (eleventyConfig) {
    // Copia a pasta 'css' inteira para o diretório de saída
    eleventyConfig.addPassthroughCopy("css");

    // Retorna um objeto de configuração
    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};