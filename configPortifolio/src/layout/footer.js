// import redesSocial from '../hook/redesSocial.js';

/**
 * @function
 * @type {string} Footer
 * @returns template html footer
 */

export function Footer() {
	const footerContainer = document.createElement('footer');
	footerContainer.classList.add('footer');

	footerContainer.innerHTML = `
        <div class="icon-rede">
            <h2 class="text-footer">Redes social</h2>
            
            </div>
            `
            // ${redesSocial()}

	document.querySelector('#app').appendChild(footerContainer);
}
