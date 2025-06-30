import AlertCustom from "./alertCustom";

export class CopyEmail {
    static copy() {
        document.getElementById('button-copy').addEventListener('click', (event) => {
            event.preventDefault()
            const copyEmail = document.getElementById('copy-email').textContent;

            navigator.clipboard.writeText(copyEmail).then(() => {
                // alert('Copiado com sucesso!');
                AlertCustom.menssagem('Email copiado com sucesso!')
            }).catch((e) => {
                console.log('erro copiar: ', e);
                // AlertCustom('Email não copiado!');
            })
        })
    }
}