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
