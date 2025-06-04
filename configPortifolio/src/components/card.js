
export function Card(title, descrition, snapshot, linguages) {
    const section = document.createElement('section');
    section.classList.add('card');

    section.innerHTML = `
        <h1>${title}</h1>

        <p>${descrition}</p>

        <img src='${snapshot}' width="100" height="100">

        <div id="tech">
            <span>${ linguages != '' ? linguages.join(' ') : 'sem linguagens'}</span>
        </div>

        <button>Previwer</button>
    `;

    document.getElementById('cards').appendChild(section);


function coresTech() {
    const cores = ['red', 'orange', 'blue', 'purple', 'green'];

    const container = document.querySelector('#tech span');
    const palavras = container.textContent.split(' ');

    container.innerHTML = palavras.map((palavra, i) => {
        const cor = cores[i % cores.length]; // usa cores ciclicamente
        return `<span style="color: ${cor}; margin-right: 6px;">${palavra}</span>`;
    }).join(' ');
}
coresTech()
}