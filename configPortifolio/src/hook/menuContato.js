export class MenuContatos {
    constructor() {
        this.array = `
            <ul class="m-ul">
		           <li class="m-li">
		            <div>
		                <img class="iconMenuSize" src="./assets/map-pin.svg">
                    </div>
		            
		            <div>
		                <span class="text">Localidade</span>
		                <span id="followers" class="text numStyle">Guarulhos</span>
		            </div>
		           </li>

		           <li class="m-li">
		            <div>
		                <img class="iconMenuSize" src="./assets/github.svg">
                    </div>
		            
		            <div>
		                <span class="text">github</span>
		                <span id="following" class="text numStyle">liliul</span>
		            </div>
		           </li>

		           <li class="m-li">
		            <div>
		                <img class="iconMenuSize" src="./assets/linkedin.svg">
                    </div>
		            
		            <div>
		                <span class="text">Linkedin</span>
		                <span id="repo-public" class="text numStyle">@Liliul</span>
		            </div>
		           </li>
		          
		        </ul>
        `
    }


    renderMenuContatos() {
        const div = document.createElement('div');

        div.innerHTML = `
            ${this.array}
        `;

        document.querySelector('.menu').appendChild(div);
    }
}