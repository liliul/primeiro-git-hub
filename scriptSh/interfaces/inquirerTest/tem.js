#!/usr/bin/env node
// npm install inquirer chalk commander ora fs-extra

import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";

const program = new Command();

program
  .name("meu-cli")
  .version("1.0.0")
  .description("CLI completo estilo create-app");

async function menuPrincipal() {
  const { opcao } = await inquirer.prompt([
    {
      type: "list",
      name: "opcao",
      message: "O que você deseja fazer?",
      choices: [
        "Criar novo projeto",
        "Configurações",
        "Sair"
      ]
    }
  ]);

  if (opcao === "Criar novo projeto") {
    await criarProjeto();
  } else if (opcao === "Configurações") {
    await menuConfig();
  } else {
    console.log(chalk.yellow("Até mais 👋"));
    process.exit();
  }

  menuPrincipal();
}

async function menuConfig() {
  const { config } = await inquirer.prompt([
    {
      type: "list",
      name: "config",
      message: "Configurações:",
      choices: [
        "Tema CLI",
        "Resetar",
        "Voltar"
      ]
    }
  ]);

  if (config === "Tema CLI") {
    console.log(chalk.blue("Tema alterado (fake) 🎨"));
  } else if (config === "Resetar") {
    console.log(chalk.red("Config resetada"));
  }

  if (config !== "Voltar") {
    await menuConfig();
  }
}

async function criarProjeto() {
  const respostas = await inquirer.prompt([
    {
      type: "input",
      name: "nome",
      message: "Nome do projeto:"
    },
    {
      type: "list",
      name: "template",
      message: "Escolha um template:",
      choices: [
        "basic",
        "react",
        "api"
      ]
    }
  ]);

  const spinner = ora("Criando projeto...").start();

  const destino = path.join(process.cwd(), respostas.nome);
  const origem = path.join(process.cwd(), "templates", respostas.template);

  try {
    await fs.copy(origem, destino);

    spinner.succeed("Projeto criado com sucesso 🎉");

    console.log(chalk.green("\nPróximos passos:"));
    console.log(chalk.cyan(`cd ${respostas.nome}`));
    console.log(chalk.cyan("npm install"));
    console.log(chalk.cyan("npm run dev"));

  } catch (erro) {
    spinner.fail("Erro ao criar projeto");
    console.error(erro);
  }
}

program
  .command("init")
  .description("Iniciar CLI interativo")
  .action(menuPrincipal);

program.parse();