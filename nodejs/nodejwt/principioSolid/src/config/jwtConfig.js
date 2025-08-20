require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'uma-chave-secreta-muito-forte-e-aleatoria-gerada-com-cripto';

module.exports = {
  jwtSecret,
  jwtExpiresIn: '1h',
};