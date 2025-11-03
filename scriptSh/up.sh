#!/bin/bash

# configs
# chmod +x up.sh
# crontab
# MINUTO  HORA  DIA_DO_MÊS  MÊS  DIA_DA_SEMANA  COMANDO

# variaveis
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
if [ "$1" == "-r" ]; then
    echo "Removendo arquivo... $PASTA_DROPBOX"
    find "$PASTA_DROPBOX" -type f -name "estudos-*.zip" -exec rm -v {} \;
    echo "Arquivo removido!"
fi
