interface ProductsFruts {
    name: string,
    price: number
}

function Main() {
    const frutas: ProductsFruts[] = [
        { name: 'banana', price: 0.80 },
        { name: 'laranja', price: 0.40 },
        { name: 'maça', price: 0.50 },
        { name: 'abacate', price: 0.90 }
    ];

    const taxa: number = 0.20
    let total = 0
    let f: any = []

    for(let fruta of frutas) {
        total += fruta.price + (fruta.price * taxa)
        f += fruta.name + ', '
    }

    let media = total / frutas.length

    console.log('total: ', total);
    console.log('media: ', media);
    console.log('frutas: ', f);
    
}

Main()