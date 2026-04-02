#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";

const program = new Command();

program
  .name("meu-cli")
  .description("CLI estilo Firebase")
  .version("1.0.0");

program
  .command("init")
  .description("Inicializar projeto")
  .action(async () => {
    console.log(chalk.blue("🚀 Iniciando setup...\n"));

    const { nome } = await inquirer.prompt([
      {
        type: "input",
        name: "nome",
        message: "Nome do projeto:",
        default: "meu-app"
      }
    ]);

    const { features } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "features",
        message: "Selecione as features:",
        choices: [
          "API",
          "Banco de Dados",
          "Autenticação",
          "Deploy"
        ]
      }
    ]);

    const { confirmar } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmar",
        message: "Deseja continuar?",
        default: true
      }
    ]);

    if (!confirmar) {
      console.log(chalk.red("❌ Cancelado."));
      return;
    }

    console.log(chalk.green("\n✅ Projeto criado!"));
    console.log(chalk.yellow("Nome:"), nome);
    console.log(chalk.yellow("Features:"), features.join(", "));
  });

program.parse();