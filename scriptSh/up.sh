#!/bin/bash

# Exemplo: ./up.sh -r
# $1 representa o primeiro parâmetro passado

# if [ "$1" == "-r" ]; then
#     echo "Removendo arquivo..."
#     rm -f portifoliozip.zip
#     echo "Arquivo removido!"
# else
#     echo "Uso: ./up.sh -r"
#     echo "Opções disponíveis:"
#     echo "  -r    remove o arquivo teste.txt"
# fi


# Caminhos
# PASTA_ORIGEM="$HOME/Documentos/obsidiancofre/estudos"
# PASTA_DESTINO="$HOME/Documentos/obsidiancofre"
# PASTA_DROPBOX="$HOME/Dropbox/test-gui-drop/obsidianCofre"

PASTA_ORIGEM="/home/liliu/Documentos/obsidiancofre/estudos"
PASTA_DESTINO="/home/liliu/Documentos/obsidiancofre"
PASTA_DROPBOX="/home/liliu/Dropbox/test-gui-drop/obsidianCofre"

# Nome do arquivo ZIP com data
DATA=$(date +"%Y-%m-%d")
ARQUIVO_ZIP="estudos-$DATA.zip"

# Entrar na pasta de origem para evitar caminhos longos
cd "$PASTA_DESTINO" || exit

# Criar o ZIP
zip -r "$ARQUIVO_ZIP" "estudos" > /dev/null

# copiar para dropbox
mv "$PASTA_DESTINO/$ARQUIVO_ZIP" "$PASTA_DROPBOX"
# Mensagem de confirmação
echo "✅ Arquivo criado em: $PASTA_DESTINO/$ARQUIVO_ZIP"
echo "☁️ Copiado para Dropbox: $PASTA_DROPBOX/$ARQUIVO_ZIP"

# Limpar .zip antigos (ex: com mais de 5 dias)
# find "$PASTA_DROPBOX" -name "estudos-*.zip" -type f -mtime +5 -delete

# crontab
# MINUTO  HORA  DIA_DO_MÊS  MÊS  DIA_DA_SEMANA  COMANDO
