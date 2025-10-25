## conheça o projeto

Neste projeto você irá desenvolver uma API para a transportadora fictícia FastFeet. Essa aplicação deve gerenciar o ciclo completo das encomendas, implementando regras de negócio como permissões para administradores e entregadores, e a exigência de foto para confirmar a entrega.

Para auxiliar na visualização de como sua API será consumida, disponibilizamos um layout de referência da aplicação que fariam uso dos seus endpoints. Isso ajudará a compreender o propósito de cada funcionalidade.

### figma: https://www.figma.com/community/file/1550522126708534266

## Instruções

### Estrutura, regras e requisitos do projeto

Você será responsável por desenvolver a API (backend) da FastFeet (transportadora fictícia). Esta API gerenciará o cadastro de usuários (administradores e entregadores), o fluxo de encomendas e o registro de destinatários.

A API deve seguir um conjunto de funcionalidades e regras de negócio.

Funcionalidades da aplicação
A aplicação deve ter dois tipos de usuário, entregador e/ou admin
Deve ser possível realizar login com CPF e Senha
Deve ser possível realizar o CRUD dos entregadores
Deve ser possível realizar o CRUD das encomendas
Deve ser possível realizar o CRUD dos destinatários
Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
Deve ser possível retirar uma encomenda
Deve ser possível marcar uma encomenda como entregue
Deve ser possível marcar uma encomenda como devolvida
Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
Deve ser possível alterar a senha de um usuário
Deve ser possível listar as entregas de um usuário
Deve ser possível notificar o destinatário a cada alteração no status da encomenda
Regras de negócio
Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
Somente o entregador que retirou a encomenda pode marcar ela como entregue
Somente o admin pode alterar a senha de um usuário
Não deve ser possível um entregador listar as encomendas de outro entregador
Conceitos que pode praticar
Este desafio foi desenhado para que você possa exercitar e aprofundar seus conhecimentos em:

Arquitetura e Design: Domain-Driven Design (DDD), Domain Events e Clean Architecture para criar um sistema robusto e escalável
Segurança: Autenticação e Autorização baseada em papéis (Role-Based Access Control - RBAC) para proteger suas rotas
Qualidade de Código: Implementação de testes unitários e de ponta a ponta (E2E) para garantir a confiabilidade da API
Integrações: Simulação de integração com serviços externos (ex: serviço de notificação)

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
            <span class="flex-shrink-0 text-gray-100 text-xs AuiLinearProgress-rightLabel">0 de 13</span>
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
            ><span>Criar os dois tipos de usuário: `admin` e `entregador`</span></label
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
            ><span>Implementar um sistema de login com CPF e Senha</span></label
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
                >Desenvolver o CRUD (Criar, Ler, Atualizar, Deletar) dos entregadores, com acesso restrito a usuários
                `admin`</span
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
            ><span>Desenvolver o CRUD dos destinatários, com acesso restrito a usuários `admin`</span></label
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
            ><span>Desenvolver o CRUD das encomendas, com acesso restrito a usuários `admin`</span></label
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
                >Implementar a funcionalidade para alterar a senha de qualquer usuário, com acesso restrito a usuários
                `admin`</span
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
            ><span
                >Implementar a funcionalidade para marcar uma encomenda como "aguardando" (disponível para
                retirada)</span
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
            ><span>Implementar a funcionalidade para um entregador registrar a "retirada" de uma encomenda</span></label
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
                >Implementar a funcionalidade para marcar uma encomenda como "entregue", exigindo o envio de uma foto e
                garantindo que apenas o entregador que a retirou possa fazer a marcação</span
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
            ><span>Implementar a funcionalidade para marcar uma encomenda como "devolvida"</span></label
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
            ><span>Desenvolver a listagem de encomendas com endereços próximos à localização do entregador</span></label
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
                >Desenvolver a listagem das entregas de um entregador, garantindo que ele só possa ver as suas
                próprias</span
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
            ><span
                >Implementar o envio de notificação ao destinatário a cada alteração no status da sua encomenda</span
            ></label
        >
    </div>
</div>
