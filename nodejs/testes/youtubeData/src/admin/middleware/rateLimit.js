import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => {
    const ip = ipKeyGenerator(req)
    const email = req.body?.email || 'unknown'
    return `${ip}-${email}`
  },
  message: {
    error: 'Conta temporariamente bloqueada por excesso de tentativas.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
})

export const ipLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20
})