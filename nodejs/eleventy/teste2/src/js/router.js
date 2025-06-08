const root = null;
const useHash = false;
const router = new Navigo(root, useHash);

async function loadPage(page) {
  const res = await fetch(`/pages/${page}.html`);
  const html = await res.text();
  document.getElementById("app").innerHTML = html;
}

router
  .on("/", () => loadPage("home"))
  .on("/sobre", () => loadPage("sobre"))
  .on("/contato", () => loadPage("contato"))
  .on('/produto', () => loadPage("produto"))
  .notFound(() => {
    document.getElementById("app").innerHTML = "<h1>Página não encontrada</h1>";
  })
  .resolve();
