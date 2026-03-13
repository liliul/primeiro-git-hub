(() => {
  // js/src/copyEmail.js
  var CopyEmail = class {
    static copy() {
      if (!document.getElementById("copy-email")) return;
      document.getElementById("copy-email").addEventListener("click", (event) => {
        event.preventDefault();
        const copyEmail = event.currentTarget.dataset.emailgithub;
        navigator.clipboard.writeText(copyEmail).then(() => {
          AlertCustom.menssagem("Email copiado com sucesso!");
        }).catch((e) => {
          console.log("erro copiar: ", e);
          AlertCustom.menssagem("Erro ao copiar email.");
        });
      });
    }
  };
  var AlertCustom = class {
    static menssagem(menssagem) {
      if (document.querySelector(".alert-custom")) return;
      const div = document.createElement("div");
      div.classList.add("alert-custom");
      div.innerHTML = `
            <button id="close-alert-custom">
              <svg viewBox="0 0 24 24" class="fechar-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g>
                <g stroke-linecap="round" stroke-linejoin="round"></g><g> 
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#DDD"></path> </g></svg>
            </button>
            <h1>${menssagem}</h1>
        `;
      document.querySelector("body").appendChild(div);
      document.getElementById("close-alert-custom").addEventListener("click", () => {
        document.querySelector(".alert-custom").remove();
      });
      setTimeout(() => {
        if (document.body.contains(div)) {
          div.remove();
        }
      }, 5e3);
    }
  };
  var copyEmail_default = CopyEmail;

  // js/src/cor.js
  function Cor() {
    const cores = {
      textoCor: "#fa7f72",
      cardHoverCor: "#a99ded",
      txtPskills1: "#111111"
    };
    let txt = "--bg-techs";
    let lang = "--bg-lang";
    let cardHover = "--card-hover-cor";
    let txtPskills = "--text-p-skills";
    if (!cores) return;
    document.documentElement.style.setProperty(txt, cores.textoCor);
    document.documentElement.style.setProperty(lang, cores.textoCor);
    document.documentElement.style.setProperty(cardHover, cores.cardHoverCor);
    document.documentElement.style.setProperty(txtPskills, cores.txtPskills1);
  }

  // js/src/openModalPreview.js
  var OpenModalPreview = class {
    static openModal(url) {
      const existing = document.querySelector(".modal-overlay");
      if (existing) existing.remove();
      const overlay = document.createElement("div");
      overlay.classList.add("modal-overlay");
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
            <button id="fechar-modal" class="s-fechar-modal">
                <svg viewBox="0 0 24 24" class="fechar-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g>
                <g stroke-linecap="round" stroke-linejoin="round"></g><g> 
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#DDD"></path> </g></svg>
            </button>

            <div id="iframe-loader">
              <div class="spinner"></div>
              <p class="loader-text"></p>
            </div>

            <iframe 
              class="iframe-modal" 
              src="${url}" 
              width="100%" 
              height="100%" 
              style="display:none;"
            >
              </iframe>
        `;
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      const iframe = modal.querySelector("iframe");
      const loader = modal.querySelector("#iframe-loader");
      const timeout = setTimeout(() => {
        document.querySelector(".loader-text").textContent = "Demorando para Carregar...";
      }, 8e3);
      const maxTimeoutFallback = setTimeout(() => {
        loader.innerHTML = `
        <div>
          <p>N\xE3o foi poss\xEDvel carregar o conte\xFAdo.</p>
          <a href="${url}" target="_blank">
            <span class="color-txt"> Abrir em nova aba</span>
          </a>
        </div>
      `;
      }, 15e3);
      iframe.addEventListener("load", () => {
        clearTimeout(timeout);
        clearTimeout(maxTimeoutFallback);
        loader.remove();
        iframe.style.display = "block";
        iframe.classList.add("loaded");
      });
      document.getElementById("fechar-modal").addEventListener("click", () => {
        overlay.remove();
        document.body.style.overflow = "";
      });
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.remove();
          document.body.style.overflow = "";
        }
      });
    }
  };
  var openModalPreview_default = OpenModalPreview;

  // js/script.js
  copyEmail_default.copy();
  Cor();
  document.addEventListener("DOMContentLoaded", function() {
    console.log("O script foi carregado com sucesso!");
    document.querySelectorAll(".js-open-modal").forEach((button) => {
      button.addEventListener("click", (event) => {
        const url = event.currentTarget.dataset.url;
        if (url) {
          openModalPreview_default.openModal(url);
        }
      });
    });
  });
})();
