require('dotenv').config(); 

const jwtSecret = process.env.JWT_SECRET || 'uma-chave-secreta-muito-forte';

module.exports = {jwtSecret};