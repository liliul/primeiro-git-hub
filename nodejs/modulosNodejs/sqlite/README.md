my-app/
├── node_modules/
├── public/ # Arquivos estáticos (CSS, JS, imagens)
├── src/
│ ├── controllers/ # Funções para lidar com as rotas
│ ├── middlewares/ # Middlewares da aplicação
│ ├── models/ # Modelos (se usar ORM como Sequelize ou Mongoose)
│ ├── routes/ # Definições das rotas
│ ├── services/ # Lógica de negócio ou integração com APIs externas
│ ├── utils/ # Funções utilitárias
│ └── app.js # Arquivo principal onde o Express é configurado
├── .env # Arquivo de variáveis de ambiente
├── .gitignore # Arquivo de exclusões do Git
├── package.json # Dependências e scripts
└── README.md # Documentação da aplicação

logger.info() → ações normais

logger.warn() → comportamentos inesperados ou suspeitos

logger.error() → falhas técnicas ou violação de regras

logger.debug() → detalhes de desenvolvimento (não para produção)

## grafana

1. Acesse o Grafana no navegador

Abra seu navegador e vá para:
👉 http://localhost:3000

Login padrão (caso não tenha mudado):

usuário: admin

senha: admin (ou a que você definiu)

2. Adicione o Loki como fonte de dados (caso ainda não tenha feito)

Se ainda não adicionou o Loki, faça isso:

No menu esquerdo, clique em "⚙️ Configuration" > "Data Sources"

Clique em “Add data source”

Selecione “Loki”

Em URL, coloque: http://loki:3100

Clique em "Save & test"

3. Acesse os logs

Vá para o menu esquerdo → "Explore" 🔍

No topo, escolha a fonte de dados "Loki"

No campo de consulta, digite: {filename=~".\*\\.log"}
