/*
Filtrando propriedades
Faça um programa que exiba somente as propriedades de um objeto que o usuário desejar.

Seu programa irá receber um objeto e um array contendo as propriedades desejadas.

Extra: faça uma verificação se a propriedade passada no array existe no objeto.
*/
function FiltrandoPropriedades(objeto) {
    for (var _i = 0, _a = Object.entries(objeto); _i < _a.length; _i++) {
        var _b = _a[_i], chave = _b[0], valor = _b[1];
        Log("".concat(chave, " : ").concat(valor));
    }
}
function Log(msg) {
    return console.log(msg);
}
var pessoa = {
    nome: "João",
    idade: 30,
    cidade: "São Paulo"
};
FiltrandoPropriedades(pessoa);
Log('---------------------------------------------');
var pessoa2 = {
    nome: "João",
    idade: 30,
    cidade: "São Paulo",
    profissao: "Desenvolvedor"
};
var propriedadesDesejadas = ["nome", "idade", "altura", "profissao"];
function filtrarPropriedades(objeto, propriedades) {
    propriedades.forEach(function (prop) {
        if (prop in objeto) {
            var valor = objeto[prop];
            console.log("".concat(prop, ": ").concat(valor));
        }
        else {
            console.warn("\u26A0\uFE0F Propriedade \"".concat(prop, "\" n\u00E3o existe no objeto."));
        }
    });
}
filtrarPropriedades(pessoa2, propriedadesDesejadas);
Log('--------------------------------------');
function getPropriedadesFiltradas(objeto, propriedades) {
    var resultado = {};
    propriedades.forEach(function (prop) {
        if (prop in objeto) {
            resultado[prop] = objeto[prop];
        }
    });
    return resultado;
}
var filtrado = getPropriedadesFiltradas(pessoa2, propriedadesDesejadas);
console.log(filtrado);
