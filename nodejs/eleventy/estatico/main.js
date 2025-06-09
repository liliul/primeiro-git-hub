// main.js
// Aqui você pode adicionar qualquer JavaScript que precise para
// interatividade em uma página única.

console.log("O site foi carregado e todo o HTML está no index.html!");

// Exemplo: Rolagem suave para as seções (se você usar links como <a href="#sobre">)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});