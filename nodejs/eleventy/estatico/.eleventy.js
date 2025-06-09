// .eleventy.js
module.exports = function (eleventyConfig) {
    // Copia assets estáticos para a pasta de saída
    eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addPassthroughCopy("main.js"); // Se main.js estiver na raiz do projeto
    eleventyConfig.addWatchTarget("./src/pages/");

    // **NOVO: Criar uma coleção para os "fragmentos" de página**
    // Isso nos permite iterar sobre eles no index.njk
    eleventyConfig.addCollection("fragments", function (collectionApi) {
        // Retorna todos os arquivos .njk (ou .md) dentro de src/pages/
        // O "!important" no nome da pasta '_pages' indica que Eleventy NÃO
        // vai gerar URLs para esses arquivos por padrão.
        // Ou você pode usar `eleventyConfig.addCollection("fragments", collectionApi => collectionApi.getFilteredByGlob("src/pages/**/*.njk"));`
        return collectionApi.getFilteredByGlob("src/pages/**/*.njk");
    });

    return {
        // Assegura que Nunjucks é o motor de templates padrão
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        dir: {
            input: ".",      // Todos os arquivos de conteúdo estão na pasta 'src'
            output: "_site",   // Onde o Eleventy vai gerar o site estático
            includes: "_includes", // Assumindo que '_includes' está na raiz do projeto
            // Se _includes está na raiz do projeto: includes: "../_includes"
            // Se _includes está dentro de src: includes: "includes" (provavelmente é seu caso)
            data: "_data"
        },
        // IMPORTANTE: Desabilita a cópia direta de arquivos que são processados como templates.
        // O Eleventy ainda processará os .njk em HTML (para injetar), mas não copiará o .njk bruto.
        passthroughFileCopy: false
    };
};