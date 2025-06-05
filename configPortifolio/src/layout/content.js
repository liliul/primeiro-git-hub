/**
 * @function
 * @type {string} Main
 * @returns template html conteudo principal
 */

export function Main() {
	const mainContainer = document.createElement('main');
	mainContainer.classList.add('content');

	mainContainer.innerHTML = `
		   <!-- aside menu -->
		    <aside class="menu">
		        
		    </aside>


		    <!-- card -->
		    <section id="cards" class="cards-container">
		        <div class="text-github">
		            <h1>Projetos</h1>
		        </div>

		    </section>

	`

	document.querySelector('#app').appendChild(mainContainer)
}
