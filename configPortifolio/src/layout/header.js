import { userConfig } from "../config";
import { SkillsTech } from "../hook/skillsTech";

const skillsTech = new SkillsTech();

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
	            <img id="avatar" src="${!userConfig.profileLogo.profile ? userConfig.profileLogo.profileDefault : userConfig.profileLogo.profile}" >
	          
	        </div>
	        
	        <div class="nome-user">
	            <h1 id="userNome">${!userConfig.nomeBio.name ? 'Sem nome' : userConfig.nomeBio.name}</h1>
	        </div>
	      </div>

	      <div class="info-rede">
	          <div class="bio">
	              <h2>Bio</h2>
	              <p id="bio">
				  	${!userConfig.nomeBio.bio ? 'Sem bio' : userConfig.nomeBio.bio}
	              </p>
	          </div>
	      </div>
	    </div>

		<div class="skills-user">
	        <h2>Tecnologias</h2>

			<div id="skills-tech-id" class="skill"></div>
	    </div>  
        `;

        document.querySelector('#app').insertAdjacentElement('afterbegin', headContainer);

		skillsTech.renderSkillsTech()
}
