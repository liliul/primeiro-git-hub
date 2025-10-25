## Conheça o projeto

Neste desafio, vamos desenvolver um Sistema de Gerenciamento de Chamados. Você deverá construir uma aplicação de ponta a ponta com front-end e back-end, utilizando as tecnologias aprendidas na formação Full-Stack, simulando um aplicativo de gerenciamento de chamados com painel de Administrador, Técnico e Cliente.

### figma: https://www.figma.com/community/file/1506654636739959765

## Instruções

### Estrutura, regras e requisitos do projeto

1. Requisitos
   Tecnologias e Recursos
   Backend Node.js:
   Framework: Express.js;
   Banco de dados: PostgreSQL;
   ORM: Prisma ou Query Builder: Knex;
   Testes:
   Framework de testes: Jest.
   Deploy:
   Deploy do backend em Render;
   Deploy do front-end: Vercel ou Netlify.
   Outros:
   Vite;
   Docker;
   TypeScript;
   Validação com Zod;
   JWT;
   TailwindCSS.

### O Sistema terá três personas: o admin, o técnico e o cliente;

O Admin: É a pessoa responsável pela gestão do Sistema
O Admin deve criar, listar e editar contas de Técnicos.
💡Ao criar uma conta de Técnico uma senha provisória será criada pelo Admin e posteriormente repassada ao Técnico que poderá alterar essa senha após o primeiro acesso à sua conta.

💡Ao criar um Técnico seu horário de disponibilidade padrão será o horário comercial: 08:00 às 12:00 e 14:00 às 18:00

Exemplo de Array de horários: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

🚩Nessa versão do Sistema não haverá exclusão de contas de Técnicos, mas você pode incluir como uma funcionalidade adicional ao seu projeto. Se desafie! [OPCIONAL]

O Admin deve criar, listar, editar e desativar os Serviços que serão executados pelos Técnicos.
💡Ao desativar um Serviço, esse Serviço não deve ser listado na criação de um novo Chamado mas deve deve permanecer nos Chamados já criados.Você pode utilizar a estratégia de Soft Delete para essa funcionalidade.

O Admin deve listar, editar e excluir contas de Clientes.
💡️Ao excluir uma conta de Cliente todos os Chamados criados por esse Cliente serão excluídos também.

O Admin deve conseguir listar todos os Chamados e suas informações;
O sistema deve permitir ao Admin editar o status dos Chamados.
O Técnico: É a pessoa responsável por executar os Serviços que foram cadastrados pelo Admin e foram solicitados pelos Clientes através de um Chamado
O sistema deve permitir ao Técnico editar o seu próprio perfil.
🚩Nessa versão do Sistema não haverá exclusão de contas de Técnicos, mas você pode incluir como uma funcionalidade adicional ao seu projeto. Se desafie! [OPCIONAL]

O sistema deve permitir o envio de imagem para ser usada no perfil do Técnico;
O sistema deve permitir ao Técnico listar todos os Chamados atribuídos a ele;
O sistema deve permitir ao Técnico adicionar novos Serviços ao Chamado se for necessário;
O sistema deve permitir ao Técnico editar o status do Chamado.
💡️Quando o Técnico iniciar um atendimento o status do Chamado deve mudar para 'Em atendimento'.

💡️Quando o Técnico encerrar um atendimento o status do Chamado deve mudar para 'Encerrado'

🚫 Não é permitido ao Técnico:

Criar, alterar ou excluir contas de Clientes.
Criar Chamados.
O Cliente: É a pessoa responsável por criar um Chamado
O Cliente deve conseguir criar, editar e excluir sua conta de Cliente.
💡️Ao excluir uma conta de Cliente todos os Chamados criados por esse Cliente serão excluídos também.

O sistema deve permitir o envio de imagem para ser usada no perfil do Cliente.
O sistema deve permitir ao Cliente escolher um Técnico disponível durante a criação do Chamado.
O sistema deve permitir ao Cliente visualizar um histórico com todos os Chamados já criados por ele.
🚫 Não é permitido ao Cliente:

Alterar ou excluir outras contas que não lhe pertençam.
Alterar qualquer informação de um Chamado após ser criado.
O Chamado: É a relação entre um Cliente e um Técnico
O sistema deve permitir que vários Chamados sejam criados por um Cliente;
O Cliente deve criar um Chamado selecionando a categoria do Serviço;
Todo Chamado deve ter pelo menos um Serviço selecionando, podendo ser adicionado novos Serviços pelo Técnico responsável pelo atendimento;
O Chamado deve exibir o valor do Serviço solicitado e o valor de cada Serviço adicional incluído pelo Técnico assim como o somatório do valor total de todos os Serviços;
Durante a criação de um Chamado o Cliente deve atribuir um Técnico responsável;
O Chamado pode ter seu status alterado pelo Técnico responsável ou pelo Admin;
O Chamado só pode ter status de: Aberto, Em atendimento ou Encerrado.
O Serviço: Categoria de atividades que serão executadas pelo Técnico e solicitadas pelos Clientes
Somente o Admin deve criar, editar e desativar as informações dos Serviços;
Os Serviços serão parte das informações de um Chamado;
Cada Serviço terá um valor a ser cobrado do Cliente. 2. Pontos de atenção
O projeto deve atender a todas as especificações listadas acima.
Deve existir uma conta de administrador.
Devem existir pelo menos 3 contas de técnicos:
Técnico 1: atende das 08h às 12h e das 14h às 18h.
Técnico 2: atende das 10h às 14h e das 16h às 20h.
Técnico 3: atende das 12h às 16h e das 18h às 22h.
Devem existir pelo menos 5 serviços a serem oferecidos:
Exemplos de serviços:
Instalação e atualização de softwares
Instalação e atualização de hardwares
Diagnóstico e remoção de vírus
Suporte a impressoras
Suporte a periféricos
Solução de problemas de conectividade de internet
Backup e recuperação de dados
Otimização de desempenho do sistema operacional
Configuração de VPN e Acesso Remoto
Os usuários deverão se autenticar para ter acesso a aplicação através da tela de login. Deve ser utilizado JWT no processo de autenticação.
A aplicação deve ser responsiva de acordo com o conceito de Mobile First seguindo o layout do Figma.
A sua aplicação deverá consumir a sua própria API.
Os repositórios devem conter um README bem detalhado tanto no back-end quanto no front-end com link de deploy e instruções para a execução da aplicação localmente.
Deve ser feito o deploy tanto do front-end quanto do back-end. 3. Desenvolvendo o projeto
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
            <span class="flex-shrink-0 text-gray-100 text-xs AuiLinearProgress-rightLabel">0 de 63</span>
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
            ><span>Configurar ambiente do projeto Node.js com TypeScript e Express.js;</span></label
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
            ><span>Configurar PostgreSQL e Prisma ou Knex para acesso ao banco;</span></label
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
            ><span>Criar Dockerfile e docker-compose para backend e banco de dados;</span></label
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
            ><span>Configurar Vite para o front-end;</span></label
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
            ><span>Adicionar TailwindCSS ao front-end;</span></label
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
            ><span>Configurar variáveis de ambiente no backend e front-end;</span></label
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
            ><span>Configurar autenticação JWT para login e acesso seguro;</span></label
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
            ><span>Implementar middleware de autenticação e autorização por perfil;</span></label
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
            ><span>Criar modelo para contas de Admin;</span></label
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
            ><span>Criar endpoint para criar conta de Admin;</span></label
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
            ><span>Criar endpoint para listar contas de Admin;</span></label
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
            ><span>Criar endpoint para editar conta de Admin;</span></label
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
            ><span>Criar endpoint para excluir conta de Admin;</span></label
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
            ><span>Criar modelo para contas de Técnico;</span></label
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
            ><span>Criar endpoint para criar conta de Técnico;</span></label
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
            ><span>Criar endpoint para listar contas de Técnico;</span></label
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
            ><span>Criar endpoint para editar conta de Técnico;</span></label
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
            ><span>Criar endpoint para alterar senha de Técnico;</span></label
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
            ><span>Criar endpoint para alterar horários de disponibilidade do Técnico;</span></label
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
            ><span>Criar endpoint para upload de imagem do Técnico;</span></label
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
            ><span>Criar modelo para contas de Cliente;</span></label
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
            ><span>Criar endpoint para criar conta de Cliente;</span></label
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
            ><span>Criar endpoint para listar contas de Cliente;</span></label
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
            ><span>Criar endpoint para editar conta de Cliente;</span></label
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
            ><span>Criar endpoint para excluir conta de Cliente;</span></label
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
            ><span>Criar endpoint para upload de imagem do Cliente;</span></label
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
            ><span>Definir horários padrão de disponibilidade para técnicos;</span></label
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
            ><span>Permitir que Técnico altere a senha após o primeiro acesso;</span></label
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
            ><span>Permitir que Admin edite horários de disponibilidade dos técnicos;</span></label
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
            ><span>Criar modelo para Serviços;</span></label
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
            ><span>Criar endpoint para criar Serviço;</span></label
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
            ><span>Criar endpoint para listar Serviços;</span></label
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
            ><span>Criar endpoint para editar Serviço;</span></label
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
            ><span>Criar endpoint para desativar Serviço com Soft Delete;</span></label
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
            ><span>Criar modelo para Chamados;</span></label
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
            ><span>Criar endpoint para criar Chamado pelo Cliente selecionando Técnico e Serviço;</span></label
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
            ><span>Criar endpoint para listar Chamados do Cliente;</span></label
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
            ><span>Criar endpoint para listar Chamados atribuídos a um Técnico;</span></label
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
            ><span>Criar endpoint para listar todos os Chamados (Admin);</span></label
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
            ><span>Criar endpoint para adicionar Serviços adicionais a um Chamado (Técnico);</span></label
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
            ><span>Criar endpoint para alterar status do Chamado para Aberto, Em atendimento ou Encerrado;</span></label
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
            ><span>Bloquear Cliente de editar ou excluir Chamado após criado;</span></label
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
            ><span>Bloquear Técnico de criar Chamados e de alterar contas de Clientes;</span></label
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
            ><span>Excluir todos os Chamados ao excluir uma conta de Cliente;</span></label
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
            ><span>Implementar regras de visibilidade para Admin, Técnico e Cliente;</span></label
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
            ><span>Criar validações com Zod para entradas de dados;</span></label
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
            ><span>Configurar Jest para testes automatizados no backend;</span></label
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
            ><span>Criar testes para endpoints de usuários (Admin, Técnico, Cliente);</span></label
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
            ><span>Criar testes para endpoints de Serviços;</span></label
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
            ><span>Criar testes para endpoints de Chamados;</span></label
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
            ><span>Testar endpoints críticos com supertest ou biblioteca similar;</span></label
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
            ><span>Criar seed inicial com 1 Admin, 3 Técnicos com faixas de horário e 5 Serviços;</span></label
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
            ><span>Criar layout front-end responsivo seguindo Mobile First com Figma;</span></label
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
            ><span>Implementar consumo da própria API no front-end;</span></label
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
            ><span>Fazer deploy do backend no Render;</span></label
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
            ><span>Fazer deploy do front-end no Vercel ou Netlify;</span></label
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
            ><span>Validar variáveis de ambiente e connection string em produção;</span></label
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
            ><span>Criar README detalhado para backend com setup, scripts, variáveis e link de deploy;</span></label
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
            ><span>Criar README detalhado para front-end com setup, scripts e link de deploy;</span></label
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
            ><span>Incluir instruções para execução local, testes e usuários de exemplo;</span></label
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
            ><span>Conferir que todos os requisitos funcionais e de perfis foram atendidos.</span></label
        >
    </div>
</div>
