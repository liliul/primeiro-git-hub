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
    const res = await fetch(`/posts/${slug}/index.html`);
    const html = await res.text();
    document.querySelector('#app').innerHTML = html;
  })
  .resolve();
