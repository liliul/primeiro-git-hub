Se estiver usando o Navigo (sem hash), as rotas personalizadas (/post/alguma-coisa) quebram em servidores simples como live-server ou mesmo o built-in do Eleventy.

📦 Para que as URLs funcionem direto sem hash, você precisa de um servidor com fallback para index.html. Ou use hash routes:

configurar navigo com o vite