import crypto from 'crypto'

class HashTokenService {
  constructor() {}

  hashRefreshToken(refreshToken) {
    return crypto.createHash('sha256').update(refreshToken).digest('hex');
  }
}

export default HashTokenService