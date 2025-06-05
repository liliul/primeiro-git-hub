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