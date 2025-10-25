## conheça o projeto

Nesse desafio, você vai desenvolver uma API para um sistema de Gerenciamento de Tarefas com Node.js. Os usuários poderão criar contas, autenticar-se com segurança e gerenciar suas tarefas. Cada tarefa poderá ser atribuída a membros do time, classificada por status e prioridade, e o progresso poderá ser acompanhado de forma simples e organizada.

## instruçoes

1. Requisitos
   Tecnologias e Recursos
   Backend Node.js:
   Framework: Express.js;
   Banco de dados: PostgreSQL;
   ORM: Prisma.
   Testes:
   Framework de testes: Jest
   Deploy:
   Deploy do backend em Render.
   Outros:
   Docker;
   TypeScript;
   Validação com Zod;
   JWT.
2. Funcionalidades da aplicação
   Autenticação e Autorização
   Deve ser possível criar uma conta e iniciar uma sessão;
   JWT para autenticação;
   Níveis de acesso:
   Administrador: gerencia usuários e equipes;
   Membro: gerencia tarefas atribuídas.
   Gerenciamento de Times
   Apenas o usuário admin pode criar e editar times;
   Apenas o usuário admin pode adicionar ou remover membros do time.
   Tarefas
   CRUD de tarefas (criar, ler, atualizar, deletar);
   Status: "Pendente", "Em progresso", "Concluído";
   Prioridade: "Alta", "Média", "Baixa";
   Atribuição de tarefas para membros específicos.
   Usuário Admin
   Visualizar e gerenciar todas as tarefas, usuários e times.
   Member
   Visualiza tarefas do time;
   Pode editar apenas suas tarefas.
   Exemplo de estrutura para o banco de dados
   Tabela: users que armazena informações dos usuários do sistema:
   Campo Tipo Descrição
   id INTEGER Identificador único (PK).
   name VARCHAR(100) Nome do usuário.
   email VARCHAR(150) E-mail do usuário (único).
   password VARCHAR(255) Senha criptografada do usuário.
   role ENUM('admin', 'member') Nível de acesso do usuário.
   created_at TIMESTAMP Data e hora de criação.
   updated_at TIMESTAMP Data e hora da última atualização.
   Tabela: teams que representa os times/equipes de trabalho:
   Campo Tipo Descrição
   id INTEGER Identificador único (PK).
   name VARCHAR(100) Nome do time.
   description TEXT Descrição opcional do time.
   created_at TIMESTAMP Data e hora de criação.
   updated_at TIMESTAMP Data e hora da última atualização.
   Tabela: team_members que relaciona usuários com times:
   Campo Tipo Descrição
   id INTEGER Identificador único (PK).
   user_id INTEGER Referência para o usuário (users.id).
   team_id INTEGER Referência para o time (teams.id).
   created_at TIMESTAMP Data e hora de criação.
   Relacionamento:

user_id → FK para users.id
team_id → FK para teams.id
Tabela: tasks armazena as tarefas criadas:
Campo Tipo Descrição
id INTEGER Identificador único (PK).
title VARCHAR(200) Título da tarefa.
description TEXT Descrição detalhada opcional da tarefa.
status ENUM('pending', 'in_progress', 'completed') Status da tarefa.
priority ENUM('high', 'medium', 'low') Prioridade da tarefa.
assigned_to INTEGER Referência para o usuário responsável pela tarefa (users.id).
team_id INTEGER Referência para o time ao qual a tarefa pertence (teams.id).
created_at TIMESTAMP Data e hora de criação.
updated_at TIMESTAMP Data e hora da última atualização.
Relacionamento:

assigned_to → FK para users.id
team_id → FK para teams.id
Tabela tasks_history que armazena mudanças de status e atualizações das tarefas.
Campo Tipo Descrição
id INTEGER Identificador único (PK).
task_id INTEGER Referência para a tarefa (tasks.id).
changed_by INTEGER Referência para o usuário que fez a alteração (users.id).
old_status ENUM Status anterior da tarefa.
new_status ENUM Novo status da tarefa.
changed_at TIMESTAMP Data e hora da alteração.
Relacionamento:

task_id → FK para tasks.id
changed_by → FK para users.id 3. Desenvolvendo o projeto
Para desenvolver esse projeto, recomendamos utilizar as principais tecnologias que utilizamos durante o desenvolvimento do primeiro módulo da formação.

Caso você tenha alguma dificuldade você pode ir no nosso
fórum
e deixar sua dúvida por lá!

Após terminar o desafio, caso você queira, você pode tentar dar o próximo passo e deixar a aplicação com a sua cara. Tente mudar o layout, cores, ou até adicionar novas funcionalidades para ir além! 🚀

4. Entrega
   Após concluir o desafio, você deve enviar a URL do seu código no Github.

Além disso, que tal fazer um post no LinkedIn compartilhando o seu aprendizado e contando como foi a experiência? É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades!

Obs: Se você se sentir à vontade, pode postar um print do resultado final e nos marcar! Vai ser incrível acompanhar a sua evolução! 💜

5. Considerações finais
   Lembre-se que o intuito de um desafio é te impulsionar, por isso, dependendo do desafio, pode ser que você precise ir além do que foi discutido em sala de aula. Mas isso não é algo ruim: ter autonomia para buscar informações extras é uma habilidade muito valiosa e vai ser ótimo pra você treinar ela aqui com a gente!

E lembre-se: tenha calma! Enfrentar desafios faz parte do seu processo de aprendizado!

Se precisar de alguma orientação ou suporte, estamos aqui com você! Bons estudos e boa prática!

<div class="flex flex-col gap-5 rounded-md border border-gray-800 p-4 md:p-8 md:pt-7">
    <div class="flex items-center justify-between">
        <div class="flex flex-col">
            <h2 class="text-span text-xs font-bold">Tarefas</h2>
            <p class="text-span text-xs">Use este checklist para ajudar a organizar a sua entrega</p>
        </div>
        <div class="flex justify-center items-center gap-3 w-full max-w-28 max-md:hidden">
            <div class="relative w-full">
                <div
                    aria-valuemax="100"
                    aria-valuemin="0"
                    aria-valuenow="0"
                    aria-valuetext="0%"
                    role="progressbar"
                    data-state="loading"
                    data-value="0"
                    data-max="100"
                    class="relative overflow-hidden bg-gray-700 rounded-full w-full h-1"
                >
                    <div
                        data-state="loading"
                        data-value="0"
                        data-max="100"
                        class="w-full h-full transition-transform duration-700"
                        style="
                            transform: translateX(-100%);
                            background: linear-gradient(90deg, rgb(0, 129, 99) 0%, rgb(41, 224, 169) 100%);
                        "
                    ></div>
                </div>
            </div>
            <span class="flex-shrink-0 text-gray-100 text-xs AuiLinearProgress-rightLabel">0 de 51</span>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar o projeto Node.js com TypeScript e Express.js;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Configurar ESLint e Prettier para padronização do código;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Configurar variáveis de ambiente com dotenv;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Configurar conexão com PostgreSQL usando Prisma;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar e configurar Dockerfile e docker-compose para banco e aplicação;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar estrutura de pastas para controllers, services, routes e middlewares;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Definir o modelo no Prisma para users;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Definir o modelo no Prisma para teams;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Definir o modelo no Prisma para team_members;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Definir o modelo no Prisma para tasks;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Definir o modelo no Prisma para tasks_history;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Gerar e aplicar as migrações no banco de dados;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar relacionamentos conforme os requisitos;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Implementar cadastro e login de usuários;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Configurar JWT para autenticação;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar middleware para proteger rotas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Implementar níveis de acesso para admin e member;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para criar times (somente admin);</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para listar times (somente admin);</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para editar times (somente admin);</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para excluir times (somente admin);</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para adicionar membros ao time (somente admin);</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para remover membros do time (somente admin);</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para listar membros de um time;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para criar tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para listar tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para editar tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para excluir tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para filtrar tarefas por status;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para filtrar tarefas por prioridade;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para atribuir tarefas a usuários;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Implementar permissões para admin gerenciar todas as tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Implementar permissões para membro gerenciar apenas suas tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar registro em tasks_history para cada mudança de status;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar endpoint para listar histórico de uma tarefa;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Usar Zod para validar payloads de criação e edição;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Garantir que apenas dados válidos sejam enviados ao banco;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Configurar Jest para testes automatizados;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar testes para autenticação;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar testes para endpoints de times;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar testes para endpoints de tarefas;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Testar endpoints críticos com supertest ou outra lib similar;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Configurar o projeto no Render;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar scripts no package.json para build e start em produção;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Validar variáveis de ambiente e connection string no Render;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Garantir que a API está acessível por URL pública;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Criar README com passos para rodar o projeto localmente;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Adicionar no README a documentação dos endpoints;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Adicionar no README o link de deploy;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Adicionar no README as instruções de como rodar os testes;</span></label
        ><label
            class="group inline-flex flex-shrink-0 select-none text-gray-200 hover:text-gray-100 transition-color items-center gap-3 text-sm leading-shorter [&amp;&gt;button[aria-checked=true]+span]:line-through [&amp;&gt;button]:m-0"
            ><button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                class="AuiCheckbox-root flex items-center justify-center flex-shrink-0 rounded-[4px] border-[1.5px] border-solid border-gray-400 bg-gray-900 data-[state=checked]:border-0 size-4 mt-[3px]"
            ></button
            ><span>Conferir se todos os requisitos foram cumpridos.</span></label
        >
    </div>
</div>
