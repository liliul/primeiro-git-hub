import { writeFile, readFile } from 'node:fs/promises'
import crypto from 'node:crypto'

// class CrudRepository<T> {
//     constructor(private file: string) {}

//     async buscaTodos(): Promise<T[]> {
//         const busca = await readFile(this.file, 'utf-8')

//         return JSON.parse(busca)
//     }

//     async salvar(data: T[]) {
//         await writeFile(this.file, JSON.stringify(data, null, 2), 'utf-8')
//     }
// }

interface User {
    id: string,
    name: string, 
    sobreNome: string, 
    pais: string,
    anime: string[]
}

const user: User[] = [{
    id: crypto.randomUUID(),
    name: 'naruto',
    sobreNome: 'uzumaki',
    pais: 'Konoha',
    anime: ['naruto classico', 'naruto shippuden']
}]

interface Tsalvar {
    root: string
    data: User[]
    encoding: BufferEncoding | 'utf-8'
}
async function SALVAR({root, data, encoding}: Tsalvar) {
    await writeFile(root, JSON.stringify(data, null, 2), encoding)
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
})

interface Tler {
    root: string,
    utf: BufferEncoding
}
async function LER({root, utf}: Tler ) {
    const ler = await readFile(root, utf)
    if (!ler) return null

    return JSON.parse(ler)
}

const ler = await LER({
    root: './database/crud.json',
    utf: 'utf-8'
})
console.log(ler);

