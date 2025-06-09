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
    divSpans.classList.add('spansWrap');
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
    const cores = ['red', 'orange', 'blue', 'purple', 'green'];
    const palavras = spanElement.textContent.split(' ');

    spanElement.innerHTML = palavras
      .map((palavra, i) => {
        const cor = cores[i % cores.length];
        return `<span style="color: ${cor}; margin-right: 6px;">${palavra}</span>`;
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
      <button id="fechar-modal" class="s-fechar-modal">X</button>

      ${!iframe ? 'voce nao tem um iframe' : `<iframe class="iframe-modal" src="${iframe}" width="100%" height="100%"></iframe>`}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('fechar-modal').addEventListener('click', () => {
      overlay.remove();
    });
  }
}
