Sim! 😄
Existem **muitos outros códigos de status HTTP**, e eles são divididos em **5 grandes categorias**, dependendo do tipo de resposta.
Aqui vai um resumo completo 👇

---

## 🔹 **1xx – Informativos**

> Indicam que a requisição foi recebida e está sendo processada.

- **100 Continue** → O servidor recebeu parte da requisição e o cliente pode continuar enviando.
- **101 Switching Protocols** → O servidor vai mudar de protocolo (ex: de HTTP para WebSocket).
- **102 Processing** → O servidor ainda está processando a requisição (usado em WebDAV).

---

## 🔹 **2xx – Sucesso**

> Indicam que a requisição foi recebida, entendida e aceita.

- **200 OK** → Requisição bem-sucedida.
- **201 Created** → Um recurso foi criado (ex: novo usuário em uma API).
- **202 Accepted** → A requisição foi aceita, mas ainda não processada.
- **204 No Content** → Sucesso, mas sem conteúdo de resposta.
- **206 Partial Content** → Apenas parte do conteúdo foi retornada (usado em downloads parciais).

---

## 🔹 **3xx – Redirecionamento**

> Indicam que o cliente deve tomar outra ação (normalmente seguir outra URL).

- **301 Moved Permanently** → O recurso foi movido permanentemente (redirecionamento fixo).
- **302 Found** → Redirecionamento temporário.
- **303 See Other** → Recurso encontrado em outra URL, deve ser acessado via GET.
- **304 Not Modified** → O recurso não mudou desde a última requisição (cache).
- **307 Temporary Redirect** / **308 Permanent Redirect** → Redirecionamentos mais específicos que mantêm o método HTTP.

---

## 🔹 **4xx – Erro do Cliente**

> Indicam que **a culpa é da requisição feita pelo cliente**.

- **400 Bad Request** → Requisição malformada (erro de sintaxe, dados errados).
- **401 Unauthorized** → Falta autenticação.
- **403 Forbidden** → Acesso proibido.
- **404 Not Found** → Recurso não encontrado.
- **405 Method Not Allowed** → Método HTTP (GET, POST, etc.) não permitido.
- **408 Request Timeout** → O cliente demorou demais para enviar a requisição.
- **409 Conflict** → Conflito ao processar a requisição (ex: recurso duplicado).
- **410 Gone** → O recurso foi removido permanentemente.
- **413 Payload Too Large** → Corpo da requisição muito grande.
- **415 Unsupported Media Type** → Tipo de dado enviado não é aceito.
- **429 Too Many Requests** → Muitas requisições (limite de taxa excedido).

---

## 🔹 **5xx – Erro do Servidor**

> Indicam que **o problema está no servidor**, não no cliente.

- **500 Internal Server Error** → Erro genérico no servidor.
- **501 Not Implemented** → Função/método não suportado pelo servidor.
- **502 Bad Gateway** → Um servidor intermediário recebeu uma resposta inválida.
- **503 Service Unavailable** → Servidor temporariamente indisponível (ex: manutenção).
- **504 Gateway Timeout** → O servidor intermediário não recebeu resposta a tempo.
- **507 Insufficient Storage** → O servidor não tem espaço para completar a requisição.
- **511 Network Authentication Required** → Precisa autenticação na rede (ex: Wi-Fi público).

---

Quer que eu te mostre uma **tabela organizada** com todos os códigos e seus significados resumidos (em formato visual, tipo planilha)? Isso ajuda bastante pra estudar ou consultar depois.
