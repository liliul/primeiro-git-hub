export class Card {
  constructor(title, description, snapshot, languages = [], iframe) {
    this.title = title;
    this.description = description;
    this.snapshot = snapshot;
    this.languages = languages;
    this.iframe = iframe;
  }

  render() {
    const section = document.createElement('section');
    section.classList.add('card');

    const h1 = document.createElement('h1');
    h1.textContent = this.title;

    const p = document.createElement('p');
    p.textContent = this.description;

    const img = document.createElement('img');
    img.src = this.snapshot;
    img.width = 100;
    img.height = 100;

    const techDiv = document.createElement('div');
    techDiv.classList.add('tech');

    const divSpans = document.createElement('div');
    divSpans.classList.add('spanWrap');
    if (this.languages.length > 0) {
      divSpans.textContent = this.languages.join(' ');
      Card.applyTechColors(divSpans);
    } else {
      divSpans.textContent = 'sem linguagens';
    }
    techDiv.appendChild(divSpans);

    const button = document.createElement('button');
    button.textContent = 'Preview';

    button.addEventListener('click', () =>
      Card.openModal(this.iframe)
    );

    section.append(h1, p, img, techDiv, button);
    document.getElementById('cards').appendChild(section);
  }

  static applyTechColors(spanElement) {
    // const cores = ['red', 'orange', 'blue', 'purple', 'green'];
    const cores = ['#ff667c', '#dd423e', '#a2a384', '#eac388', '#c5ad4b'];

    const palavras = spanElement.textContent.split(' ');

    spanElement.innerHTML = palavras
      .map((palavra, i) => {
        const cor = cores[i % cores.length];
        return `<span class="circle" style="color: ${cor};">${palavra}</span>`;
      })
      .join('');
  }

  static openModal(iframe) {
    const existing = document.querySelector('.modal');
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

      ${!iframe ? 'voce nao tem um iframe' : `<iframe class="iframe-modal" src="${iframe}" width="100%" height="100%"></iframe>`}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('fechar-modal').addEventListener('click', () => {
      overlay.remove();
    });
  }
}
