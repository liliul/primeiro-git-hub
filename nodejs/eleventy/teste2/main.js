// main.js
// import Navigo from 'navigo'; // Se estiver usando módulo ES6, senão Navigo já estará global

// const router = new Navigo('/', { linksSelector: 'a', hash: true }); // linksSelector: 'a' intercepta todos os <a>

// const appDiv = document.querySelector('#app');

// // Função auxiliar para carregar o conteúdo de um fragmento HTML gerado pelo Eleventy
// async function loadPartial(path) {
//     try {
//         // Constrói o caminho para o fragmento: /partials/<caminho_da_rota>.html
//         const partialPath = `/partials${path === '/' ? '/index' : path}.html`;
//         console.log(`Buscando partial: ${partialPath}`); // Para depuração

//         const res = await fetch(partialPath);

//         if (!res.ok) {
//             if (res.status === 404) {
//                 return '<h1>404 - Conteúdo não encontrado</h1><p>Parece que o conteúdo desta seção não foi gerado ou não está no caminho correto.</p>';
//             }
//             throw new Error(`Erro ao carregar partial: ${res.status} ${res.statusText}`);
//         }
//         return await res.text();
//     } catch (error) {
//         console.error('Erro ao carregar partial:', error);
//         return '<h1>Erro interno ao carregar conteúdo.</h1>';
//     }
// }

// // Define as rotas
// router
//     .on('/', async () => {
//         appDiv.innerHTML = await loadPartial('/');
//     })
//     .on('/sobre', async () => {
//         appDiv.innerHTML = await loadPartial('/sobre');
//     })
//     .on('/contato', async () => {
//         appDiv.innerHTML = await loadPartial('/contato');
//     })
   
//     .notFound(() => {
//         appDiv.innerHTML = '<h1>404 - Página Não Encontrada</h1><p>Desculpe, a página que você procura não existe.</p>';
//     })
//     .resolve(); // Resolve a rota inicial no carregamento da página

// Opcional: Adicionar um listener para cliques em links que não são capturados pelo Navigo (se houver problemas)
// Este já está coberto por linksSelector: 'a' no construtor do Navigo,
// mas pode ser útil para entender ou depurar.
/*
document.body.addEventListener('click', e => {
    const targetLink = e.target.closest('a');
    if (targetLink) {
        const href = targetLink.getAttribute('href');
        // Verifica se é um link interno e não é hash/âncora ou link externo
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
            e.preventDefault(); // Impede o comportamento padrão do link
            const path = href.startsWith('/') ? href : `/${href}`;
            router.navigate(path);
        }
    }
});
*/