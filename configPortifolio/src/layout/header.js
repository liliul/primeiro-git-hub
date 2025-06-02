// import tecnologia from '../hook/tecnologia.js';

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
	            <img id="avatar" >
	          
	        </div>
	        
	        <div class="nome-user">
	            <h1 id="userNome"></h1>
	        </div>
	      </div>

	      <div class="info-rede">
	          <div class="bio">
	              <h2>Bio</h2>
	              <p id="bio">
	              </p>
	          </div>

	          <div class="links">
	            <a id="link-github" href="#">
	                <div class="i-link" title="link para o github">
	                    
                    
	                </div>
	            </a>

	            <a id="link-blog" href="#">
	                <div class="i-link" title="link para o blog">
	                    
                    </div>
	            </a>
	          </div>
	      </div>
	    </div>

        `
	    // ${tecnologia()}
        document.querySelector('#app').insertAdjacentElement('afterbegin', headContainer);
}
