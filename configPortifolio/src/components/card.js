export function Card(title, description, snapshot, languages = []) {
    const section = document.createElement('section');
    section.classList.add('card');

    const h1 = document.createElement('h1');
    h1.textContent = title;

    const p = document.createElement('p');
    p.textContent = description;

    const img = document.createElement('img');
    img.src = snapshot;
    img.width = 100;
    img.height = 100;

    const techDiv = document.createElement('div');
    techDiv.classList.add('tech');
    
    const span = document.createElement('span');
    if (languages.length > 0) {
        span.textContent = languages.join(' ');
        applyTechColors(span)
    } else {
        span.textContent = 'sem linguagens';
    }
    techDiv.appendChild(span);

    const button = document.createElement('button');
    button.textContent = 'Preview';

    button.addEventListener('click', () => openModal(title, description, snapshot, languages));

    section.append(h1, p, img, techDiv, button);
    document.getElementById('cards').appendChild(section);

}

function applyTechColors(spanElement) {
    const cores = ['red', 'orange', 'blue', 'purple', 'green'];
    const palavras = spanElement.textContent.split(' ');

    spanElement.innerHTML = palavras.map((palavra, i) => {
        const cor = cores[i % cores.length];
        return `<span style="color: ${cor}; margin-right: 6px;">${palavra}</span>`;
    }).join('');
}

function openModal(title, description, snapshot, languages) {
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
