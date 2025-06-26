import OpenModalPreview from "../hook/openModalPreview";
import AplicarCoresTech from "../hook/aplicarCoresTech";

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
      AplicarCoresTech.applyTechColors(divSpans);
    } else {
      divSpans.textContent = 'sem linguagens';
    }
    techDiv.appendChild(divSpans);

    const button = document.createElement('button');
    button.textContent = 'Preview';

    button.addEventListener('click', () =>
      OpenModalPreview.openModal(this.iframe)
    );

    section.append(h1, p, img, techDiv, button);
    document.getElementById('cards').appendChild(section);
  }
}
