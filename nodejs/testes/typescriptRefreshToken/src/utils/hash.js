import bcrypt from 'bcrypt'

const token = await bcrypt.hash('narutoXgoku', 10) 
const refresh = await bcrypt.hash('itachiXkakashi', 10) 

console.log(token)
console.log(refresh)

