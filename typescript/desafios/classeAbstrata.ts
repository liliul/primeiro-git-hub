/**
 *  Clases abstract nao se instancia 
 * 
 *  ex: const pagamento = new Pagamento / erro 
 *  
 * **/

abstract class Pagamento {
    protected taxa: number = 0;

    abstract pagar(valor: number): void;

    calcularTotal(valor: number): number {
        return valor + this.taxa;
    }
}

class CartaoCredito extends Pagamento {
    constructor() {
        super()
        this.taxa = 5;
    }

    pagar(valor: number): void {
        const total = this.calcularTotal(valor);
        console.log('Cartão de credito: ', total);
    }
}

class Pix extends Pagamento {
    pagar(valor: number): void {
        console.log('Pix: ', valor);
    }
}

class Boleto extends Pagamento {
    constructor() {
        super()
        this.taxa = 2;
    }

    pagar(valor: number): void {
        const total = this.calcularTotal(valor);
        console.log('Boleto bancario: ', total);
    }
}

const pagamento: Pagamento[] = [
    new CartaoCredito(),
    new Pix(),
    new Boleto()
]

pagamento.forEach((functionPagamentos) => {
    const results = functionPagamentos.pagar(10);

    return results;
})