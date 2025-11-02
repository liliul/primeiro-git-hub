interface Processamento {
	processarPagamento: () => void
}

function processarPagamento(tipo: Processamento) {
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

processarPagamento(stripe)
processarPagamento(pix)
processarPagamento(nubanck)
