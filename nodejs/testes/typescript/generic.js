function Generic(value) {
    return value;
}
var primeira = Generic(12345);
var segunda = Generic('generic');
var terceira = Generic(true);
var quarta = Generic(['banana', 'maça', 'uva']);
var quinta = Generic({ id: 'asalasdka', nome: 'Naruto' });
console.log(primeira);
console.log(segunda);
console.log(terceira);
console.log(quarta);
console.log(quinta);
// function identity<T extends { length: number }>(value: T): T {
//     console.log(value.length);  // Pode acessar .length porque T tem a restrição
//     return value;
// }
// identity([1, 2, 3]); // Válido
// identity("Hello");   // Válido
// identity(123);       // Erro, número não tem .length
var record = {
    name: 'naruto',
    poder: 'razengan'
};
console.log(record);
