import argon2 from 'argon2'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export class HashService {
  constructor() {
    this.PEPPER = process.env.PASSWORD_PEPPER
    
    if (!this.PEPPER) {
			throw new Error("PASSWORD_PEPPER pode estar ausente na .env");
		}
  }

  applyPepper(password) {
    return crypto.createHmac('sha256', this.PEPPER).update(password).digest('hex')
  }

  async compare(password, hash) {
    const peppered = this.applyPepper(password)

    return argon2.verify(hash, peppered)
  }

  async hash(password) {
    const peppered = this.applyPepper(password)

    const hash = await argon2.hash(peppered, {
      type: argon2.argon2id, 
      memoryCost: 19456,   
      timeCost: 2,
      parallelism: 1,
    })

    return hash
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
    return jwt.verify(token, this.secret, { algorithms: ['HS256'] })
  }
}

export class RefreshTokenService {
  constructor({secret, expiresIn = '30d'}) {
    this.secret = secret
    this.expiresIn = expiresIn
  }

  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  verify(token) {
    return jwt.verify(token, this.secret, { algorithms: ['HS256'] })
  }
}

export class HashTokenService {
  constructor() {}

  hashRefreshToken(refreshToken) {
    return crypto.createHash('sha256').update(refreshToken).digest('hex');
  }
}