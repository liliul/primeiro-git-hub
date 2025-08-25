const { createHash } = require('node:crypto')

const hash = createHash('sha256')
console.log('hash',hash);

hash.on('readable', () => {
    const data = hash.read()

    if (data) {
        console.log(data.toString('hex'))
    }
})

hash.write('some data to hash')
hash.end()

hash.update('one');
console.log(hash.copy().digest('hex'));

hash.update('two');
console.log(hash.copy().digest('hex'));

hash.update('three');
console.log(hash.copy().digest('hex'));

// Asynchronous
const {
  randomBytes,
} = require('node:crypto');

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

const {
  createHmac,
} = require('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.on('readable', () => {
  const data = hmac.read();
  if (data) {
    console.log('hmac: ', data.toString('hex'));
  }
});

hmac.write('some data to hash');
hmac.end();