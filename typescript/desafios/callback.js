var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function CallBack(_a) {
    var nome = _a.nome, callback = _a.callback;
    var msg = 'Ola ' + nome;
    callback(msg);
}
function mensagem(mensagem) {
    if (!mensagem)
        return;
    var msgUpperCase = mensagem.toUpperCase();
    return console.log(msgUpperCase);
}
CallBack({ nome: 'Naruto Uzumaki', callback: mensagem });
function QualAnime(_a, chucksJson) {
    var id = _a.id, nome = _a.nome, anime = _a.anime, author = _a.author, origem = _a.origem, description = _a.description, isperadoEm = _a.isperadoEm;
    var construirJson = {
        id: id,
        nome: nome,
        anime: anime,
        author: author,
        origem: origem,
        description: description,
        isperadoEm: isperadoEm
    };
    var primeirasInfos = {
        id: id,
        nome: nome,
        anime: anime,
        author: author
    };
    var segundaInfos = {
        origem: origem,
        description: description,
        isperadoEm: isperadoEm
    };
    chucksJson(construirJson, primeirasInfos, segundaInfos);
}
function chucksJson(original, primeiro, segunda) {
    console.log('original: ', original);
    console.log('primeiro chuck: ', primeiro);
    console.log('segundo chuck: ', segunda);
    console.log('juntando primeiro e segunda: ', __assign(__assign({}, primeiro), segunda));
}
QualAnime({
    id: 1,
    nome: 'Naruto tokyo tv',
    anime: 'naruto classico',
    author: 'Masashi kishimoto',
    origem: 'JP',
    description: 'Naruto classico é um anime japones feito pelo mangaka "Masashi kishimoto"',
    isperadoEm: [
        'dragon ball',
        'dragon ball z',
        'super 11',
        'cavaleiros do zodioco',
        'hiyo hiyo oh'
    ]
}, chucksJson);
