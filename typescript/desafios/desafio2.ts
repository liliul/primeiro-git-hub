export class Mensagem {
    mensagem(msg: string, num: number) {
        const section = document.createElement('section')
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
        `
        section.setAttribute('style', sectionStyles)

        section.innerHTML = `
            <h1>${msg}</h1>
            <p style="color: blue;font-size: 14px;">${num}</p>
            <span id="close">X</span>
        `

        document.querySelector('#msgId')?.appendChild(section)

        document.getElementById('close')?.addEventListener('click', (e) => {
            console.log(e.target)

            section.remove()
        })

        setTimeout(() => {
            section.remove()
        }, 5000);
    }
}

const notification = new Mensagem()
notification.mensagem('Typescript puro sem reactjs', 100)