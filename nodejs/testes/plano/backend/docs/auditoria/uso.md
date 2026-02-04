## Regra de ouro da auditoria

> **Audite eventos que mudam estado ou impactam segurança / dados.**
> Se não muda nada relevante → logger já basta.

---

## Lugares ESSENCIAIS pra auditoria

### 🔐 1️⃣ Autenticação & Segurança (prioridade máxima)

Tu já começou certo aqui.

Auditar:

* `LOGIN_SUCCESS`
* `LOGIN_FAIL`
* `LOGOUT`
* `REFRESH_TOKEN`
* `PASSWORD_CHANGED`
* `PASSWORD_RESET_REQUEST`
* `PASSWORD_RESET_CONFIRM`
* `ACCOUNT_LOCKED`
* `ACCOUNT_DISABLED`

📌 **Por quê?**

* detectar brute force
* investigar acessos
* compliance
* suporte ao usuário

---

### 👤 2️⃣ Alterações em dados do usuário

Qualquer coisa que **o próprio usuário muda**:

* `USER_PROFILE_UPDATED`
* `USER_EMAIL_CHANGED`
* `USER_PASSWORD_CHANGED`
* `USER_DELETED`

📌 Inclui:

* quem fez (`userId`)
* quem foi afetado (`targetUserId`, se diferente)
* quando

---

### 🛂 3️⃣ Ações administrativas

Tudo que **um admin faz com terceiros**:

* `ADMIN_USER_CREATED`
* `ADMIN_USER_UPDATED`
* `ADMIN_USER_DELETED`
* `ROLE_GRANTED`
* `ROLE_REVOKED`

📌 Isso é **obrigatório** em sistemas sérios.

---

### 💳 4️⃣ Eventos críticos de negócio

Depende do teu domínio, mas exemplos:

* pedido cancelado
* pagamento confirmado/falhou
* alteração de plano
* estorno

📌 Se der problema no futuro, isso salva tua pele.

---

## Lugares OPCIONAIS (bom senso)

### ⚙️ 5️⃣ Configurações do sistema

* feature flags
* parâmetros globais
* integrações externas

Audita **só mudanças**, não leitura.

---

### 🧠 6️⃣ Ações automatizadas

* jobs
* webhooks
* syncs

Mas só se:

* alterarem dados
* tiverem impacto financeiro / legal

---

## Onde NÃO usar auditoria ❌

* ❌ validação de input
* ❌ erros de runtime
* ❌ exceptions
* ❌ chamadas de API de leitura
* ❌ fluxo interno de código

👉 Isso é **logger**, não auditoria.

---

## Arquitetura recomendada (simples e limpa)

### Controller

* chama service
* chama auditoria
* **nunca decide lógica de auditoria complexa**

### Service

* regra de negócio
* pode **emitir eventos** (opcional)

### Auditoria

* serviço único
* grava no banco
* nunca lança erro

---

## Modelo mental rápido 🧠

Pergunta sempre:

> “Se daqui a 6 meses alguém perguntar
> **quem fez isso, quando e de onde**,
> eu consigo responder?”

Se a resposta for **não** → audita.

---

## TL;DR

* 🔐 auth sempre
* 👤 mudanças de usuário
* 🛂 ações administrativas
* 💳 eventos críticos
* ❌ erros = logger
