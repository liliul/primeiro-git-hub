function processarPagamento(tipo) {
	if (tipo.processarPagamento) {
		tipo.processarPagamento()
	}else {
		console.log('Processamento de Pagamento Invalido.')
	}
}

const pix = {
	processarPagamento: () => {console.log('processarPagamento via PIX')}
}

const nubanck = {
	processarPagamento: () => {console.log('processarPagamento via NUBANCK')}
}

const stripe = {
	processarPagamento: () => {console.log('processarPagamento via STRIPE')}
}

processarPagamento(pix)