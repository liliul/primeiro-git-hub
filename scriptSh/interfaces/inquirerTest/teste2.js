import inquirer from "inquirer";

async function setup() {
  const { projeto } = await inquirer.prompt([
    {
      type: "input",
      name: "projeto",
      message: "Nome do projeto:"
    }
  ]);

  const { features } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "features",
      message: "Escolha as funcionalidades:",
      choices: ["API", "Banco de Dados", "Auth", "Deploy"]
    }
  ]);

  const { confirmar } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmar",
      message: "Deseja continuar?"
    }
  ]);

  console.log({ projeto, features, confirmar });
}

setup();