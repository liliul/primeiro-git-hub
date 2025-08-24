Criar um gerador de senhas com **Vite** e **TypeScript** é um projeto simples e interessante. Vamos criar um gerador de senhas que permita ao usuário escolher o comprimento da senha e incluir diferentes tipos de caracteres (letras maiúsculas, minúsculas, números e símbolos).

Aqui está um passo a passo para construir esse projeto:

### 1. **Configuração do Projeto com Vite e TypeScript**

Primeiro, vamos criar o projeto usando o **Vite** e **TypeScript**.

#### Passo 1: Criar o projeto com Vite

Abra o terminal e execute os seguintes comandos para configurar o projeto.

```bash
# Crie o projeto com Vite
npm create vite@latest password-generator --template vanilla-ts

# Navegue até o diretório do projeto
cd password-generator

# Instale as dependências
npm install
```

Esse comando cria um projeto Vite básico com **TypeScript**.

#### Passo 2: Estrutura do Projeto

Depois que o Vite configurar o projeto, você verá a seguinte estrutura básica:

```
password-generator/
├── index.html
├── src/
│   ├── main.ts
├── style.css
├── package.json
└── tsconfig.json
```

Agora, vamos editar esses arquivos para adicionar a funcionalidade de **geração de senha**.

### 2. **Modificar o `index.html`**

Modifique o arquivo `index.html` para adicionar um layout simples com campos de entrada para os parâmetros da senha e um botão para gerar a senha.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Generator</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div id="app">
      <h1>Gerador de Senha</h1>

      <div>
        <label for="length">Comprimento da senha:</label>
        <input type="number" id="length" min="8" max="20" value="12" />
      </div>

      <div>
        <input type="checkbox" id="uppercase" checked />
        <label for="uppercase">Incluir maiúsculas</label>
      </div>

      <div>
        <input type="checkbox" id="numbers" checked />
        <label for="numbers">Incluir números</label>
      </div>

      <div>
        <input type="checkbox" id="symbols" checked />
        <label for="symbols">Incluir símbolos</label>
      </div>

      <button id="generate-btn">Gerar Senha</button>

      <div>
        <label for="password">Senha Gerada:</label>
        <input type="text" id="password" readonly />
      </div>
    </div>

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 3. **Adicionar Estilos Simples (`style.css`)**

O arquivo `style.css` pode ser simples, mas pode melhorar a aparência do gerador.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

#app {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

input[type="number"],
input[type="text"] {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

label {
  margin-right: 8px;
}
```

### 4. **Lógica do Gerador de Senha (`main.ts`)**

Agora, vamos para o arquivo `main.ts` onde escreveremos a lógica para gerar a senha com base nas opções selecionadas pelo usuário.

```typescript
// Função para gerar a senha com base nas opções
function generatePassword(
  length: number,
  useUppercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  // Concatena os caracteres permitidos
  let allowedChars = lowercaseChars;
  if (useUppercase) allowedChars += uppercaseChars;
  if (useNumbers) allowedChars += numberChars;
  if (useSymbols) allowedChars += symbolChars;

  // Gera a senha de comprimento "length"
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}

// Função para manipular o evento de clique no botão "Gerar Senha"
document.getElementById("generate-btn")?.addEventListener("click", () => {
  const length = Number(
    (document.getElementById("length") as HTMLInputElement).value
  );
  const useUppercase = (
    document.getElementById("uppercase") as HTMLInputElement
  ).checked;
  const useNumbers = (document.getElementById("numbers") as HTMLInputElement)
    .checked;
  const useSymbols = (document.getElementById("symbols") as HTMLInputElement)
    .checked;

  const generatedPassword = generatePassword(
    length,
    useUppercase,
    useNumbers,
    useSymbols
  );

  // Exibe a senha gerada no campo de texto
  (document.getElementById("password") as HTMLInputElement).value =
    generatedPassword;
});
```

### 5. **Rodar o Projeto**

Agora, no terminal, execute o comando para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Isso vai iniciar o Vite e abrir o aplicativo no navegador. O gerador de senha estará funcionando! Você pode:

1. Escolher o comprimento da senha.
2. Selecionar se deseja incluir letras maiúsculas, números e símbolos.
3. Clicar no botão "Gerar Senha" para ver a senha gerada automaticamente.

### 6. **Resumo do Fluxo**

- **Input**: O usuário escolhe as opções para o comprimento da senha e os tipos de caracteres que deseja incluir.
- **Lógica**: A função `generatePassword` escolhe aleatoriamente os caracteres permitidos com base nas opções selecionadas e monta a senha.
- **Output**: A senha gerada é exibida no campo de texto.

---

Isso cobre os passos básicos para criar um gerador de senhas com **Vite** e **TypeScript**. Se quiser adicionar mais recursos como copiar para a área de transferência ou gerar senhas mais seguras (como forçar a inclusão de pelo menos uma letra maiúscula, número, etc.), posso te ajudar a implementar esses recursos também!
