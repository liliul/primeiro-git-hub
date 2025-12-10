transforma shell script em comando executável global

```bash

mkdir -p ~/.local/bin
mv ~/Documentos/upobisidian.sh ~/.local/bin/upobisidian
chmod +x ~/.local/bin/up

export PATH="$HOME/.local/bin:$PATH"
source ~/.zshrc

upobisidian -h

crontab -e
54 18 * * * /home/liliu/.local/bin/upobsidian -r >> /home/liliu/cron.log 2>&1
55 18 * * * /home/liliu/.local/bin/upobsidian -b >> /home/liliu/cron.log 2>&1

```
