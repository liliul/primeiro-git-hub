## conheça o projeto

Nesse desafio você irá desenvolver uma API em Node.js para realizar o gerenciamento completo de tarefas (CRUD). As funcionalidades essenciais incluem a criação, listagem com filtros por título e descrição, atualização, remoção e a marcação de tarefas como concluídas. O principal diferencial do projeto é a implementação de uma rotina de importação de tarefas em massa a partir de um arquivo CSV, utilizando a biblioteca ⁠csv-parse.

### instruçẽes

O desafio consiste na criação de uma API em Node.js para gerenciar tarefas. O principal objetivo é aplicar os conceitos de CRUD (Create, Read, Update, Delete) e manipulação de arquivos.

Estrutura de uma Tarefa
Cada tarefa deve ser composta pelas seguintes propriedades:

id: Um identificador único para cada tarefa
title: O título da tarefa
description: Uma descrição detalhada da tarefa
completed_at: A data de conclusão da tarefa, que deve iniciar como null
created_at: A data de criação da tarefa
updated_at: A data da última atualização da tarefa, que deve ser alterada a cada modificação
Regras das Rotas
A API deve possuir as seguintes rotas e regras de negócio:

POST /tasks
Cria uma nova tarefa.
Recebe title e description no corpo da requisição.
Os campos id, created_at, updated_at e completed_at devem ser preenchidos automaticamente.
GET /tasks
Lista todas as tarefas existentes.
Permite a busca por tarefas, filtrando pelos campos title e description.
PUT /tasks/:id
Atualiza uma tarefa específica pelo id.
Recebe title e/ou description no corpo da requisição para atualização.
Antes de atualizar, deve validar se o id fornecido corresponde a uma tarefa existente.
DELETE /tasks/:id
Remove uma tarefa específica pelo id.
Antes de remover, deve validar se o id fornecido corresponde a uma tarefa existente.
PATCH /tasks/:id/completea
Altera o status da tarefa entre completa e não completa, modificando o campo completed_at.
Antes de alterar, deve validar se o id fornecido corresponde a uma tarefa existente.
E a importação do CSV?
Normalmente em uma API, a importação de um CSV acontece enviando o arquivo pela rota, por meio de outro formato, chamado multipart/form-data. Como esse desafio visa manter a implementação mais simples, você pode realizar essa funcionalidade por meio de um arquivo de script import-csv.js, por exemplo.

Para realizar isso, utilize a lib
csv-parse
, utilizando o exemplo de
iterador async
.

Com a biblioteca instalada utilizando o gerenciador de pacotes de sua preferência, crie um arquivo a parte para realizar a leitura do arquivo CSV.

Nesse arquivo, deve ser feito a leitura do CSV e para cada linha, realize uma requisição para a rota POST - /tasks, passando os campos necessários.

Recomendação do formato do CSV:

```
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
```

Recomendação de implementação
Semelhante ao que foi feito no
stream-http-server.js
, nas aulas, utilizando o for await, também é possível fazer com o parse da lib informada acima. (Lembre-se de pular a primeira linha do CSV)

Indo além
Algumas sugestões do que pode ser implementado:

Validar se as propriedades title e description das rotas POST e PUT estão presentes no body da requisição.
Nas rotas que recebem o /:id, além de validar se o id existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.

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
            <span class="flex-shrink-0 text-gray-100 text-xs AuiLinearProgress-rightLabel">0 de 12</span>
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
            ><span>Desenvolver a rota `POST /tasks` para criar uma nova tarefa</span></label
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
            ><span>Desenvolver a rota `GET /tasks` para listar todas as tarefas</span></label
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
            ><span>Implementar a funcionalidade de busca por `title` e `description` na rota `GET /tasks`</span></label
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
            ><span>Desenvolver a rota `PUT /tasks/:id` para atualizar uma tarefa</span></label
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
            ><span>Adicionar a validação de existência do `id` na rota `PUT /tasks/:id`</span></label
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
            ><span>Desenvolver a rota `DELETE /tasks/:id` para remover uma tarefa</span></label
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
            ><span>Adicionar a validação de existência do `id` na rota `DELETE /tasks/:id`</span></label
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
            ><span
                >Desenvolver a rota `PATCH /tasks/:id/complete` para marcar uma tarefa como concluída/pendente</span
            ></label
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
            ><span>Adicionar a validação de existência do `id` na rota `PATCH /tasks/:id/complete`</span></label
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
            ><span>Criar um script separado para a importação de tarefas</span></label
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
            ><span>Utilizar a biblioteca `csv-parse` para ler o arquivo CSV</span></label
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
            ><span
                >Implementar a lógica de enviar requisição para `POST /tasks` para cada linha do CSV no script de
                importação</span
            ></label
        >
    </div>
</div>
