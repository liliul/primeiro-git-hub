export class Mensagem {
    mensagem(msg, num) {
        var _a, _b;
        const section = document.createElement('section');
        const sectionStyles = `
            color: tomato;
            font-size: 12px;
            width: 350px;
            height: 100px;
            background-color: #212121;
            padding: 10px;
            position: absolute;
            top: 50px;
            right: 100px;
        `;
        section.setAttribute('style', sectionStyles);
        section.innerHTML = `
            <h1>${msg}</h1>
            <p style="color: blue;font-size: 14px;">${num}</p>
            <span id="close">X</span>
        `;
        (_a = document.querySelector('#msgId')) === null || _a === void 0 ? void 0 : _a.appendChild(section);
        (_b = document.getElementById('close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            console.log(e.target);
            section.remove();
        });
        setTimeout(() => {
            section.remove();
        }, 5000);
    }
}
const notification = new Mensagem();
notification.mensagem('Typescript puro sem reactjs', 100);
