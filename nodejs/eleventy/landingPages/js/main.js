(()=>{var d=class{static copy(){document.getElementById("copy-email").addEventListener("click",t=>{t.preventDefault();let e=t.currentTarget.dataset.emailgithub;navigator.clipboard.writeText(e).then(()=>{a.menssagem("Email copiado com sucesso!")}).catch(o=>{console.log("erro copiar: ",o),a.menssagem("Erro ao copiar email.")})})}},a=class{static menssagem(t){if(document.querySelector(".alert-custom"))return;let e=document.createElement("div");e.classList.add("alert-custom"),e.innerHTML=`
            <button id="close-alert-custom">
              <svg viewBox="0 0 24 24" class="fechar-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g>
                <g stroke-linecap="round" stroke-linejoin="round"></g><g> 
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#DDD"></path> </g></svg>
            </button>
            <h1>${t}</h1>
        `,document.querySelector("body").appendChild(e),document.getElementById("close-alert-custom").addEventListener("click",()=>{document.querySelector(".alert-custom").remove()}),setTimeout(()=>{document.body.contains(e)&&e.remove()},5e3)}},i=d;function m(){let r={textoCor:"#fa7f72",cardHoverCor:"#E9967A",txtPskills1:"#111111"},t="--bg-techs",e="--bg-lang",o="--card-hover-cor",l="--text-p-skills";r&&(document.documentElement.style.setProperty(t,r.textoCor),document.documentElement.style.setProperty(e,r.textoCor),document.documentElement.style.setProperty(o,r.cardHoverCor),document.documentElement.style.setProperty(l,r.txtPskills1))}var c=class{static openModal(t){let e=document.querySelector(".modal-overlay");e&&e.remove();let o=document.createElement("div");o.classList.add("modal-overlay");let l=document.createElement("div");l.classList.add("modal"),l.innerHTML=`
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
              src="${t}" 
              width="100%" 
              height="100%" 
              style="display:none;"
            >
              </iframe>
        `,o.appendChild(l),document.body.appendChild(o),document.body.style.overflow="hidden";let n=l.querySelector("iframe"),s=l.querySelector("#iframe-loader"),p=setTimeout(()=>{document.querySelector(".loader-text").textContent="Demorando para Carregar..."},8e3),v=setTimeout(()=>{s.innerHTML=`
        <div>
          <p>N\xE3o foi poss\xEDvel carregar o conte\xFAdo.</p>
          <a href="${t}" target="_blank">
            <span class="color-txt"> Abrir em nova aba</span>
          </a>
        </div>
      `},15e3);n.addEventListener("load",()=>{clearTimeout(p),clearTimeout(v),s.remove(),n.style.display="block",n.classList.add("loaded")}),document.getElementById("fechar-modal").addEventListener("click",()=>{o.remove(),document.body.style.overflow=""}),o.addEventListener("click",g=>{g.target===o&&(o.remove(),document.body.style.overflow="")})}},u=c;i.copy();m();document.addEventListener("DOMContentLoaded",function(){console.log("O script foi carregado com sucesso!"),document.querySelectorAll(".js-open-modal").forEach(r=>{r.addEventListener("click",t=>{let e=t.currentTarget.dataset.url;e&&u.openModal(e)})})});})();
