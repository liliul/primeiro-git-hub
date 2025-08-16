const bcrypt = require('bcrypt')

let senha = 'NarutoUchiha'
let compareSenha = 'NarutoUchiha'

let salts = 10

const hash = bcrypt.hash(senha, salts, (err, hash) => {
    console.log('hash', hash);

    bcrypt.compare(compareSenha, hash, (err, hashCompare) => {
        if (err) throw new Error('Erro na comparação da senha', err)
        
        console.log('senha: ', hashCompare);
        
    })

})

console.log(bcrypt);
