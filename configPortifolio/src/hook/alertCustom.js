class AlertCustom {
    static menssagem(menssagem) {
        if (document.querySelector('.alert-custom')) return;

        const div = document.createElement('div');
        div.classList.add('alert-custom');

        div.innerHTML = `
            <button id="close-alert-custom">x</button>
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

export default AlertCustom;