class interfaceExperiencia {
    constructor() {
        this.img = ""
        this.nome = ""
        this.data = ""
        this.oquefaz = ""
        this.competencia = ""
        this.atuacao = ""
        this.fezoque = ""
    }
}

export class MenuExperiencia extends interfaceExperiencia {
    constructor() {
        super()
    }

    build() {
        this.html()
    }

    html() {
        const div = document.createElement('div')
        div.classList.add('experiencia')

        div.innerHTML = `
          
                <header class="ex-header">
                    <img src="${this.img}" alt="globe" class="ex-img">

                    <div class="ex-info">
                        <h1>${this.nome}</h1>
                        <span>${this.data}</span>
                    </div>
                </header>

                <section class="ex-conteudo">
                    <ul class="ex-ul">
                        <li class="ex-li">
                            <h2>o que faz: <span>${this.oquefaz}</span></h2>
                            <p>copetencias: <span>${this.competencia}</span></p>

                            <div class="ex-sub-infos">
                                <h3>atuação na empresa: <span>${this.atuacao}</span></h3>
                                <p>fez o que: <span>${this.fezoque}</span></p>
                            </div>
                        </li>
                    </ul>
                </section>
           
        `

        document.querySelector('#c-experinecia').appendChild(div)
    }
}