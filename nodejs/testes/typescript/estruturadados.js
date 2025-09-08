const hash = new Map

hash.set('naruto', 'sasuke')
console.log(hash);

for (h of hash) {
    console.log(h[1]);
    console.log(hash);   
}

const hh = hash.get('naruto')
console.log(hh);

