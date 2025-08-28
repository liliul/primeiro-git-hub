const bcrypt = require('bcrypt')

const senha = 'naruto10'
const hash = bcrypt.hashSync(senha, 10)
console.log(hash);
