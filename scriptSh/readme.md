transforma shell script em comando executável global

```bash

mkdir -p ~/.local/bin
mv ~/Documentos/upobisidian.sh ~/.local/bin/upobisidian
chmod +x ~/.local/bin/up

export PATH="$HOME/.local/bin:$PATH"
source ~/.zshrc

upobisidian -h

```
