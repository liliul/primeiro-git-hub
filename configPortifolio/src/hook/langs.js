// import { Card } from "../components/card";


// 				// this.arrayLinguages = ['javascript','html','css/sass','firebase','typescript']


// 			renderHtml(array) {
// 				const divContainer = document.createElement('div')

// 				array.forEach((lang) => {
// 					const divSvg = document.createElement('div')
// 					divSvg.innerHTML = `
// 						<svg style="color:#00ADD8;" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-dot-fill mr-2">
// 						    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
// 						</svg>
// 					`;

// 					const span = document.createElement('span');
// 					span.setAttribute('style', 'margin-right:5px;')
// 					span.textContent = `${lang}`;

// 					const div = document.createElement('div')
// 					div.classList.add('flex')
// 					div.appendChild(divSvg)
// 					div.appendChild(span)

// 					divContainer.appendChild(div)
// 				})

// 				document.querySelector('#root').appendChild(divContainer)
// 			}

import { Card } from "../components/card.js";
import { userConfig } from "../config/index.js";

const arrayInfos = userConfig.cardInfos

arrayInfos.map((infos) => {
	// console.log(infos);
	Card(infos.title, infos.description, infos.snapshot, infos.linguages)
	
})
