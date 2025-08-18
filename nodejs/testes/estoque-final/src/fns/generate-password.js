const crypto = require('crypto')

function generatePassword() {
    return crypto.randomBytes(18).toString('hex')
}

module.exports = generatePassword