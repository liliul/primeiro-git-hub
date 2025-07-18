class CopyEmail {
    static copy() {
        document.getElementById('button-copy').addEventListener('click', (event) => {
            event.preventDefault()
            
            const copyEmail = document.getElementById('copy-email').textContent;

            navigator.clipboard.writeText(copyEmail).then(() => {

                AlertCustom.menssagem('Email copiado com sucesso!')

              }).catch((e) => {

                console.log('erro copiar: ', e);
                
                AlertCustom.menssagem('Erro ao copiar email.')
            })
        })
    }
}

class AlertCustom {
    static menssagem(menssagem) {
        if (document.querySelector('.alert-custom')) return;

        const div = document.createElement('div');
        div.classList.add('alert-custom');

        div.innerHTML = `
            <button id="close-alert-custom">
              <svg viewBox="0 0 24 24" class="fechar-svg" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g>
                <g stroke-linecap="round" stroke-linejoin="round"></g><g> 
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#DDD"></path> </g></svg>
            </button>
            <h1>${menssagem}</h1>
        `;

        document.querySelector('body').appendChild(div);
        
        document.getElementById('close-alert-custom').addEventListener('click', () => {
            document.querySelector('.alert-custom').remove();
        })
        
        setTimeout(() => {
            if (document.body.contains(div)) {
                div.remove();
            }
        }, 5000);   
    }
}

export default CopyEmail;