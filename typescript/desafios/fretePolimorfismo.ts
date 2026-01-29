// usando polimorfismo

interface Frete {
  calcular(peso: number): number;
}

class FreteNormal implements Frete {
  calcular(peso: number): number {
    return peso * 5;
  }
}

class FreteExpresso implements Frete {
  calcular(peso: number): number {
    return peso * 10 + 20;
  }
}

class FreteInternacional implements Frete {
  calcular(peso: number): number {
    return peso * 20 + 100;
  }
}

class FreteGratis implements Frete {
  calcular(): number {
    return 0;
  }
}


function calcularFrete(frete: Frete, peso: number): number {
  return frete.calcular(peso);
}

const normal = new FreteNormal();
const expresso = new FreteExpresso();
const internacional = new FreteInternacional();
const gratis = new FreteGratis();

console.log(calcularFrete(normal, 10));        
console.log(calcularFrete(expresso, 10));      
console.log(calcularFrete(internacional, 10)); 
console.log(calcularFrete(gratis, 10)); 
