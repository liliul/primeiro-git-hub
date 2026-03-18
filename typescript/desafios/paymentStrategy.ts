type PaymentStrategy = keyof typeof paymentStrategies

const paymentStrategies = {
  pix:    (amount: number) => `Pague R$${amount} via Pix`,
  card:   (amount: number) => `Cobrando R$${amount} no cartão`,
  boleto: (amount: number) => `Boleto de R$${amount} gerado`,
}

class Checkout {
  private strategy: PaymentStrategy
  
  constructor(strategy: PaymentStrategy) { 
    this.strategy = strategy 
  }
  
  pay(amount: number): string { 
    return paymentStrategies[this.strategy](amount) 
  }
}

const checkoutCard = new Checkout('card')
console.log(checkoutCard.pay(150))

const checkoutBoleto = new Checkout('boleto')
console.log(checkoutBoleto.pay(160))

const checkoutPix = new Checkout('pix')
console.log(checkoutPix.pay(112))