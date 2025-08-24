// Função para gerar a senha com base nas opções
function generatePassword(length: number, useUppercase: boolean, useNumbers: boolean, useSymbols: boolean): string {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    // Concatena os caracteres permitidos
    let allowedChars = lowercaseChars;
    if (useUppercase) allowedChars += uppercaseChars;
    if (useNumbers) allowedChars += numberChars;
    if (useSymbols) allowedChars += symbolChars;
    
    // Gera a senha de comprimento "length"
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    
    return password;
}

// Função para manipular o evento de clique no botão "Gerar Senha"
document.getElementById('generate-btn')?.addEventListener('click', () => {
    const length = Number((document.getElementById('length') as HTMLInputElement).value);
    const useUppercase = (document.getElementById('uppercase') as HTMLInputElement).checked;
    const useNumbers = (document.getElementById('numbers') as HTMLInputElement).checked;
    const useSymbols = (document.getElementById('symbols') as HTMLInputElement).checked;

    const generatedPassword = generatePassword(length, useUppercase, useNumbers, useSymbols);
    
    // Exibe a senha gerada no campo de texto
    (document.getElementById('password') as HTMLInputElement).value = generatedPassword;
});
