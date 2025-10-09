const imc = (peso: number, altura: number) => {
    return  (peso / Math.pow(altura, 2)).toFixed(2)    
}

console.log(imc(110, 1.70));
