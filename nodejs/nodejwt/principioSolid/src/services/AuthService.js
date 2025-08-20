const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig'); // Importa a chave secreta e tempo de expiração

class AuthService {
  /**
   * Gera o hash de uma senha.
   * @param {string} password - Senha em texto simples.
   * @returns {Promise<string>} O hash da senha.
   */
  static async hashPassword(password) {
    const saltRounds = 10; // Custo do hash
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compara uma senha em texto simples com um hash.
   * @param {string} plainPassword - Senha em texto simples.
   * @param {string} hashedPassword - Hash da senha armazenado.
   * @returns {Promise<boolean>} True se as senhas coincidirem, false caso contrário.
   */
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Gera um JSON Web Token (JWT).
   * @param {Object} payload - Dados a serem incluídos no token (ex: { id, role }).
   * @returns {string} O token JWT.
   */
  static generateToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
  }
}

module.exports = AuthService;