import { CopyEmail } from "../hook/copyEmail";

export class MenuContatos {
	constructor(contatoStringHtml) {
		this.contatos = contatoStringHtml;
	}
	renderMenuContatos() {
		const ul = document.createElement('ul');
		ul.classList.add('m-ul')
		ul.innerHTML = `
		    ${this.contatos}
		`;

		document.querySelector('#menu-contatos').appendChild(ul);

		CopyEmail.copy();
	}
}