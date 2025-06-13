export class MenuContatos {
	constructor() {
		this.array = `
			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/map-pin.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Localidade</span>
					<span id="followers" class="text numStyle">Brasil</span>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/github.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">github</span>
					<a href="https://www.github.com/liliul" target="_blank" class="text numStyle">liliul</a>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/linkedin.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Linkedin</span>
					<a href="https://www.linkedin.com/in/liliu-lililzers-5bb4b8189" target="_blank" class="text numStyle">@Liliu</a>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/mail.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Email</span>
					<span class="text numStyle">@liliuContato</span>

					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>
			
			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/folder.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Curriculo</span>
					<a href="#" target="_blank" class="text numStyle">liliu</a>

					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>
        `
	}


	renderMenuContatos() {
		const ul = document.createElement('ul');
		ul.classList.add('m-ul')
		ul.innerHTML = `
		    ${this.array}
		`;

		document.querySelector('.menu').appendChild(ul);
	}
}