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
            <h2 class="text-footer">&copy; 2023 Meu Site de Uma Página</h2>    
        </div>
        `;

    document.querySelector('#app').appendChild(footerContainer);
}
