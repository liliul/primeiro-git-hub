// import Navigo from 'navigo';

const router = new Navigo('/', { hash: true });

router
  .on('/', async () => {
    const res = await fetch('/index.html');
    const html = await res.text();
    document.querySelector('#app').innerHTML = html;
  })
  .on('/post/:slug', async ({ data }) => {
    const slug = data.slug;
    const res = await fetch(`/post/${slug}/index.html`);
    const html = await res.text();
    document.querySelector('#app').innerHTML = html;
  })
  .on('/contato', async () => {
    const res = await fetch(`/contato/`);
    const html = await res.text();
    document.querySelector('#app').innerHTML = html;
    console.log(html);

  })
  .resolve();

// const router = new Navigo('/', { hash: true });
// const appDiv = document.querySelector('#app'); // Melhor pegar uma vez

// // Função auxiliar para carregar o conteúdo de um partial
// async function loadPartial(path) {
//   try {
//     const res = await fetch(`/partials${path}.html`); // Note o /partials no caminho!
//     if (!res.ok) {
//       // Se a resposta não for OK (ex: 404), lance um erro
//       throw new Error(`Failed to load partial: ${res.status} ${res.statusText}`);
//     }
//     return await res.text();
//   } catch (error) {
//     console.error('Erro ao carregar partial:', error);
//     return '<h1>Erro ao carregar conteúdo.</h1>'; // Ou uma mensagem de erro mais elaborada
//   }
// }

// router
//   .on('/', async () => {
//     appDiv.innerHTML = await loadPartial('/index'); // Busca /partials/index.html
//   })
//   .on('/post/:slug', async ({ data }) => {
//     const slug = data.slug;
//     appDiv.innerHTML = await loadPartial(`/posts/${slug}`); // Busca /partials/posts/SLUG.html
//   })
//   // Opcional: Adicione um fallback para rotas não encontradas
//   .notFound(() => {
//     appDiv.innerHTML = '<h1>404 - Conteúdo não encontrado</h1><p>A página que você procura não existe.</p>';
//   })
//   .resolve(); // Inicializa o roteador

// // Adicionar o listener para interceptar cliques nos links e usar o Navigo
// document.body.addEventListener('click', e => {
//   const targetLink = e.target.closest('a'); // Pega o <a> mais próximo, se clicou em um filho

//   if (targetLink) {
//     const href = targetLink.getAttribute('href');

//     // Verifica se é um link interno que o Navigo deve lidar
//     if (href && !href.startsWith('#') && !href.startsWith('http')) {
//       e.preventDefault(); // Impede o comportamento padrão do link

//       // Garante que o caminho para o Navigo tenha a barra inicial
//       const path = href.startsWith('/') ? href : `/${href}`;
//       router.navigate(path);
//     }
//   }
// });