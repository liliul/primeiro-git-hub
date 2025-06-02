import { userConfig } from '../config/index.js';

/**
 * @type {string} lets
 * @description ### codigo que muda a cor da variavel css com setProperty
 */

let txt        = "--bg-techs";
let lang       = "--bg-lang";
let cardHover  = "--card-hover-cor";
let txtPskills = "--text-p-skills";

document.documentElement.style.setProperty(txt, userConfig.textoCor);
document.documentElement.style.setProperty(lang, userConfig.textoCor);
document.documentElement.style.setProperty(cardHover, userConfig.cardHoverCor);
document.documentElement.style.setProperty(txtPskills, userConfig.txtPskills);


/*
	Rascunho

	salmon fa7f72
	salmonDark E9967A
	salmonLight #FFA07A

	quantum #111111

	azul #75D7EC
*/
