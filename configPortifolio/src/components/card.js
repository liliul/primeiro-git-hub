
export function Card(title, descrition, snapshot, linguages) {
    const section = document.createElement('section');
    section.classList.add('card');

    section.innerHTML = `
        <h1>${title}</h1>

        <p>${descrition}</p>

        <img src='${snapshot}' width="100" height="100">

        <div>
            <span>${ linguages != '' ? linguages.join(' ') : 'sem linguagens'}</span>
        </div>

        <button>Previwer</button>
    `;

    document.getElementById('cards').appendChild(section);
}