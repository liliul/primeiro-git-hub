// const informando: User = {
//     name: 'naruto',
//     banck: 'nunbanck',
//     products: ['intel 15-15300k', 'Ram 16gb', 'RTX 5090'],
//     velues: 35000,
//     cep: 87660000,
//     address: 'avenida brasil',
//     idade: 23
// }
// console.log(informando);
var Informando = {
    name: 'naruto',
    banck: 'nunbanck',
    products: ['intel 15-15300k', 'Ram 16gb', 'RTX 5090', 15, 10],
    velues: 35000,
};
console.log('omit', Informando);
var pickInformando = {
    products: ['naruto', 22, 'sasuke', 23],
    velues: 123
};
console.log('pick', pickInformando);
var counter = [];
for (var _i = 0, _a = pickInformando.products; _i < _a.length; _i++) {
    var items = _a[_i];
    counter.push(items);
}
console.log(counter);
