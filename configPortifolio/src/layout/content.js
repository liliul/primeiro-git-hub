/**
 * @function
 * @type {string} Main
 * @returns template html conteudo principal
 */

export function Main() {
	const mainContainer = document.createElement('main');
	mainContainer.classList.add('content');

	mainContainer.innerHTML = `
		  <div>
		 	 <!-- aside menu -->
				<aside id="menu-contatos" class="menu">
					<div class="txt-h1">
						<h1>Contatos</h1>
					</div>
				</aside> 

				<aside id="menu-experiencias" class="menu-experiencia">
					<div class="txt-h1">
						<h1>Experiência</h1>
					</div>

					<section id="c-experinecia" class="c-experiencia"></section>
				</aside>
		  </div>


		    <!-- card -->
		    <section id="cards" class="cards-container">
		        <div class="text-github">
		            <h1>Projetos</h1>
		        </div>

		    </section>

	`

	document.querySelector('#app').appendChild(mainContainer)
}
