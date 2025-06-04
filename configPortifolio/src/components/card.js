export class Card {
  constructor(title, description, snapshot, languages = []) {
    this.title = title;
    this.description = description;
    this.snapshot = snapshot;
    this.languages = languages;
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

    const span = document.createElement('span');
    span.classList.add('spanWrap');
    if (this.languages.length > 0) {
      span.textContent = this.languages.join(' ');
      Card.applyTechColors(span);
    } else {
      span.textContent = 'sem linguagens';
    }
    techDiv.appendChild(span);

    const button = document.createElement('button');
    button.textContent = 'Preview';

    button.addEventListener('click', () =>
      Card.openModal(this.title, this.description, this.snapshot, this.languages)
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

  static openModal(title, description, snapshot, languages) {
    const existing = document.querySelector('.modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
      <h2>${title}</h2>
      <p>${description}</p>
      <img src="${snapshot}" width="200" height="200">
      <p><strong>Tecnologias:</strong> ${languages.join(', ') || 'sem linguagens'}</p>
      <button id="fechar-modal">Fechar</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('fechar-modal').addEventListener('click', () => {
      overlay.remove();
    });
  }
}
