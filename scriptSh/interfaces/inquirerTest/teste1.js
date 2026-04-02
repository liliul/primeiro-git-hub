import inquirer from "inquirer";

async function iniciar() {
  const respostas = await inquirer.prompt([
    {
      type: "checkbox",
      name: "features",
      message: "Selecione as features do Firebase:",
      choices: [
        "Authentication",
        "Firestore",
        "Functions",
        "Hosting",
        "Storage"
      ]
    }
  ]);

  console.log("Você escolheu:", respostas);
}

iniciar();