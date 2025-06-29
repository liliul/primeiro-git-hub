export class CopyEmail {
    static copy() {
        document.getElementById('button-copy').addEventListener('click', () => {
            const copyEmail = document.getElementById('copy-email').textContent;

            navigator.clipboard.writeText(copyEmail).then(() => {
                alert('Copiado com sucesso!');
            }).catch((e) => console.log('erro', e))
        })
    }
}