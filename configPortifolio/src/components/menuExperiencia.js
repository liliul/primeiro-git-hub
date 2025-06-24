export class MenuExperiencia {
    constructor() {

    }

    build() {
        this.html()
    }

    html() {
        const div = document.createElement('div')
        div.classList.add('c-experinecia')
        
        div.innerHTML = `
            <div class="experiencia">
                <header class="ex-header">
                    <img src="./assets/globe.svg" alt="globe" class="ex-img">

                    <div class="ex-info">
                        <h1>liliul fundação brasil</h1>
                        <span>mai de 2020 - set de 2022</span>
                    </div>
                </header>

                <section class="ex-conteudo">
                    <ul class="ex-ul">
                        <li class="ex-li">
                            <h2>o que faz: <span>desenvolvi uma fetuare no frontend</span></h2>
                            <p>copetencias: <span>typescript react next</span></p>

                            <div class="ex-sub-infos">
                                <h3>atuação na empresa: <span>desenvolvedor pleno</span></h3>
                                <p>fez o que: <span>frontend</span></p>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        `

        document.querySelector('#menu-experiencias').appendChild(div)
    }
}