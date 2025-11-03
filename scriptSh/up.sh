#!/bin/bash

# configs
# chmod +x up.sh
# crontab
# MINUTO  HORA  DIA_DO_MÊS  MÊS  DIA_DA_SEMANA  COMANDO
# crontab -e // editar. crontab -l // lista
# 12 19 * * * /home/liliu/Documentos/up.sh >> /home/liliu/cron.log 2>&1

# variaveis
PASTA_ORIGEM="/home/liliu/Documentos/obsidiancofre/estudos"
PASTA_DESTINO="/home/liliu/Documentos/obsidiancofre"
PASTA_DROPBOX="/home/liliu/Dropbox/test-gui-drop/obsidianCofre"

# Nome do arquivo ZIP com data
DATA=$(date +"%Y-%m-%d")
ARQUIVO_ZIP="estudos-$DATA.zip"
ARQUIVO_ZIP2="enem-$DATA.zip"

# Entrar na pasta de origem para evitar caminhos longos
cd "$PASTA_DESTINO" || exit

# Limpar .zip antigos
# find "$PASTA_DROPBOX" -name "estudos-*.zip" -type f -mtime +5 -delete
if [ "$1" == "-r" ]; then
    echo "Removendo arquivo... $PASTA_DROPBOX"
    find "$PASTA_DROPBOX" -type f -name "estudos-*.zip" -exec rm -v {} \;
    find "$PASTA_DROPBOX" -type f -name "enem-*.zip" -exec rm -v {} \;
    echo "Arquivo removido!"
else
    # Criar o ZIP
    zip -r "$ARQUIVO_ZIP" "estudos" > /dev/null
    zip -r "$ARQUIVO_ZIP2" "enem" > /dev/null

    # copiar para dropbox
    mv "$PASTA_DESTINO/$ARQUIVO_ZIP" "$PASTA_DROPBOX"
    mv "$PASTA_DESTINO/$ARQUIVO_ZIP2" "$PASTA_DROPBOX"

    # Mensagem de confirmação
    echo "✅ Arquivo criado em: $PASTA_DESTINO/$ARQUIVO_ZIP"
    echo "☁️ Copiado para Dropbox: $PASTA_DROPBOX/$ARQUIVO_ZIP"
fi

if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    echo "Uso: up [opção]"
    echo "   sem parâmetro  -> cria backups"
    echo "   -r             -> remove backups antigos"
    exit 0
fi

