### 📺 Canal do usuário autenticado

- Nome do canal
- ID do canal
- Descrição
- Thumbnail
- Data de criação
- Estatísticas:

  - inscritos
  - visualizações
  - quantidade de vídeos

Endpoint:

- `channels.list` (`mine=true`)

---

## 🎞️ Vídeos do usuário

### 📤 Uploads

- Listar todos os vídeos enviados pelo usuário
- Acessar o **upload playlist** automática do canal

### 📊 Estatísticas dos vídeos

- Views
- Likes / Dislikes (limitado)
- Comentários
- Duração
- Tags
- Categoria
- Status (público, não listado, privado)

Endpoints:

- `playlistItems.list`
- `videos.list`

---

## 🗂️ Playlists (bem completo)

Além de **listar playlists**, você pode:

- Criar playlists
- Atualizar título e descrição
- Excluir playlists
- Adicionar vídeos a playlists
- Remover vídeos de playlists
- Reordenar vídeos dentro da playlist

Endpoints:

- `playlists.*`
- `playlistItems.*`

---

## 💬 Comentários

Com OAuth você pode:

### 📥 Ler

- Comentários dos vídeos do usuário
- Respostas de comentários

### ✍️ Escrever

- Responder comentários
- Criar comentários
- Excluir comentários
- Moderar (aprovar, rejeitar, marcar como spam)

Endpoints:

- `commentThreads.list`
- `comments.insert`
- `comments.delete`

---

## 👍 Likes, dislikes e favoritos

- Ver vídeos que o usuário **curtiu**
- Curtir um vídeo
- Remover curtida
- Descurtir (dislike)

Endpoint:

- `videos.rate`

---

## 🔔 Inscrições (subscriptions)

Você pode:

- Listar canais que o usuário é inscrito
- Inscrever o usuário em um canal
- Cancelar inscrição

Endpoints:

- `subscriptions.list`
- `subscriptions.insert`
- `subscriptions.delete`

---

## 🔎 Pesquisa avançada

Além de pesquisa pública, você pode:

- Pesquisar **conteúdo privado do usuário**
- Filtrar por:

  - data
  - tipo (vídeo, canal, playlist)
  - duração
  - evento ao vivo
  - idioma

Endpoint:

- `search.list`

---

## 📺 Transmissões ao vivo (Live)

Se o canal tiver live habilitada:

- Criar lives
- Agendar transmissões
- Atualizar título/descrição
- Iniciar / encerrar lives
- Gerenciar stream keys

Endpoints:

- `liveBroadcasts.*`
- `liveStreams.*`

---

## 📈 Analytics (API separada)

Com OAuth também dá para usar a **YouTube Analytics API**:

- Tempo de exibição
- Retenção de público
- CTR
- Origem de tráfego
- Demografia
- Receita (se monetizado)

⚠️ Essa é **outra API**, mas usa o mesmo OAuth.

---

## ⚠️ Limitações importantes

- **Quota diária** (ex: 10.000 units/dia)
- Algumas ações custam muitas units
- Dados sensíveis exigem:

  - app verificado
  - justificativa para o Google

- Dislike não é mais público (retornos limitados)

---

## 💡 Exemplos de apps possíveis

- Dashboard de criador
- Gerenciador de playlists
- Ferramenta de moderação de comentários
- Agendador de vídeos/lives
- Analisador de performance do canal
- Integração YouTube + outro sistema (CRM, LMS, etc)

---
