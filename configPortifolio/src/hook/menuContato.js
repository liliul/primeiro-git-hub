export class MenuContatos {
	constructor() {
		this.array = `
			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/map-pin.svg">
				</div>
				
				<div>
					<span class="text">Localidade</span>
					<span id="followers" class="text numStyle">Brasil</span>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/github.svg">
				</div>
				
				<div>
					<span class="text">github</span>
					<a href="https://www.github.com/liliul" target="_blank" class="text numStyle">liliul</a>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/linkedin.svg">
				</div>
				
				<div>
					<span class="text">Linkedin</span>
					<a href="https://www.linkedin.com/in/liliu-lililzers-5bb4b8189" target="_blank" class="text numStyle">@Liliu</a>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/mail.svg">
				</div>
				
				<div>
					<span class="text">Email</span>
					<span class="text numStyle">@liliuContato</span>
				</div>
			</li>
			
			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/folder.svg">
				</div>
				
				<div>
					<span class="text">Curriculo</span>
					<a href="#" target="_blank" class="text numStyle">liliu</a>
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