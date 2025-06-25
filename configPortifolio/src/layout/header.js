import { userConfig } from "../config";

/**
 * @function
 * @type {string}
 * @returns template html header
 */

export function Header() {
	const headContainer = document.createElement('header');
	headContainer.classList.add('head');

	headContainer.innerHTML = `	
	    <div class="user-info">
	      <div class="c-img">
	        <div class="img">
	            <img src="${!userConfig.profileLogo.profile ? userConfig.profileLogo.profileDefault : userConfig.profileLogo.profile}" >
	        </div>
	        
	        <div class="nome-user">
	            <h1>${!userConfig.nomeBio.name ? 'Sem nome' : userConfig.nomeBio.name}</h1>
	        </div>
	      </div>

	      <div class="info-rede">
	          <div class="bio">
	              <h2>Bio</h2>
	              <p>
				  	${!userConfig.nomeBio.bio ? 'Sem bio' : userConfig.nomeBio.bio}
	              </p>
	          </div>
	      </div>
	    </div>

		<div class="skills-user">
	        <h2>Tecnologias</h2>

			<ul id="skills-tech-id" class="skill"></ul>
	    </div>  
        `;

	document.querySelector('#app').insertAdjacentElement('afterbegin', headContainer);
}
