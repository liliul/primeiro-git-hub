function processarPagamento(tipo) {
    if (tipo.processarPagamento) {
        tipo.processarPagamento();
    }
    else {
        console.log('Processamento de Pagamento Invalido.');
    }
}
var pix = {
    processarPagamento: function () { console.log('processarPagamento via PIX'); }
};
var nubanck = {
    processarPagamento: function () { console.log('processarPagamento via NUBANCK'); }
};
var stripe = {
    processarPagamento: function () { console.log('processarPagamento via STRIPE'); }
};
processarPagamento(pix);
