interface User {
    name: string
    idade: number
    banck: string
}

interface Infos {
    address: string
    cep: number
    products?: (string | number)[]
    velues: number
}

type Arr = string | number

interface User extends Infos {
    name: string
    banck: string
    products: Arr[]
    velues: number
}

// const informando: User = {
//     name: 'naruto',
//     banck: 'nunbanck',
//     products: ['intel 15-15300k', 'Ram 16gb', 'RTX 5090'],
//     velues: 35000,
//     cep: 87660000,
//     address: 'avenida brasil',
//     idade: 23
// }

// console.log(informando);

const Informando: Omit<User, 'cep' | 'address' | 'idade'> = {
    name: 'naruto',
    banck: 'nunbanck',
    products: ['intel 15-15300k', 'Ram 16gb', 'RTX 5090', 15, 10],
    velues: 35000,
}

console.log('omit', Informando);

const pickInformando: Pick<Infos, 'products' | 'velues'> = {
    products: ['naruto',22,'sasuke',23],
    velues: 123
}
console.log('pick', pickInformando);

let counter: (string | number)[] = []
for (let items of pickInformando.products) {
    counter.push(items)
}

console.log(counter);
