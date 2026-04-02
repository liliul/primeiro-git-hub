cli:
```bash
# package.json
{
  "type": "module",
  "bin": {
    "meu-cli": "./cli.js"
  }
}

chmod +x cli.js
npm link

meu-cli init

# remover link
npm unlink -g meu-cli
```