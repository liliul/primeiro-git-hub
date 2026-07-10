import { writeFile, readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
const user = [{
        id: crypto.randomUUID(),
        name: 'naruto',
        sobreNome: 'uzumaki',
        pais: 'Konoha',
        anime: ['naruto classico', 'naruto shippuden']
    }];
async function SALVAR({ root, data, encoding }) {
    await writeFile(root, JSON.stringify(data, null, 2), encoding);
}
SALVAR({
    root: './database/crud.json',
    data: [{
            id: crypto.randomUUID(),
            name: 'Sasuke',
            sobreNome: 'uUchiha',
            pais: 'Konoha',
            anime: ['naruto classico', 'naruto shippuden']
        }],
    encoding: 'utf-8'
});
async function LER({ root, utf }) {
    const ler = await readFile(root, utf);
    if (!ler)
        return null;
    return JSON.parse(ler);
}
const ler = await LER({
    root: './database/crud.json',
    utf: 'utf-8'
});
console.log(ler);
