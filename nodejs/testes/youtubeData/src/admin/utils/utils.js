import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class HashService {
  async compare(plain, hashed) {
    return bcrypt.compare(plain, hashed)
  }

  async hash(plain, rounds = 10) {
    return bcrypt.hash(plain, rounds)
  }
}

export class TokenService {
  constructor(secret, expiresIn = '1h') {
    this.secret = secret
    this.expiresIn = expiresIn
  }

  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  verify(token) {
    return jwt.verify(token, this.secret)
  }
}