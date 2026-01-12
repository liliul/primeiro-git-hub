class OpenModalPreview {
  static openModal(url) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');

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
               loading="lazy"
              referrerpolicy="no-referrer"
              sandbox="allow-scripts allow-forms allow-same-origin"
            >
              </iframe>
        `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const iframe = modal.querySelector('iframe');
    const loader = modal.querySelector('#iframe-loader');
    const timeout = setTimeout(() => {
      document.querySelector('.loader-text').textContent = 'Demorando para Carregar...';
    }, 8000);
    const maxTimeoutFallback = setTimeout(() => {
      loader.innerHTML = `
        <div>
          <p>Não foi possível carregar o conteúdo.</p>
          <a href="${url}" target="_blank">
            <span class="color-txt"> Abrir em nova aba</span>
          </a>
        </div>
      `;
    }, 15000);
    
    iframe.addEventListener('load', () => {
      clearTimeout(timeout);
      clearTimeout(maxTimeoutFallback);
      loader.remove();
      iframe.style.display = 'block';
      iframe.classList.add('loaded');
    });

    document.getElementById('fechar-modal').addEventListener('click', () => {
      overlay.remove();
      document.body.style.overflow = '';
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
        document.body.style.overflow = '';
      }
    });
  }
}

export default OpenModalPreview;