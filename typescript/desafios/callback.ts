interface Icallback {
    nome: string
    callback: (mensagem: string) => void 
}

function CallBack({nome, callback}: Icallback): void {
   const msg = 'Ola ' + nome

   callback(msg)
}

function mensagem(mensagem: string): void {
    if (!mensagem) return

    const msgUpperCase = mensagem.toUpperCase()

    return console.log(msgUpperCase)
}

CallBack({nome: 'Naruto Uzumaki', callback: mensagem})