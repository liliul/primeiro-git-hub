### iniciar projeto

```bash

"start": "eleventy --serve",
"build": "ELEVENTY_ENV=production eleventy",
"test": "echo && exit 1",
"build:js": "esbuild js/script.js --bundle --minify --outfile=js/main.js",
"build:es": "npm run build:js && eleventy",
"dev:js": "esbuild js/script.js --bundle --outfile=js/main.js --watch"

```

### configurações do tema

```bash

#mudar as cores em destaque
# pasta js/src/cor.js

const cores = {
    textoCor: "#fa7f72",
    cardHoverCor: "#E9967A",
    txtPskills1: "#111111",
}

```

### configurações data

```bash

# pasta _data/config.js

```
