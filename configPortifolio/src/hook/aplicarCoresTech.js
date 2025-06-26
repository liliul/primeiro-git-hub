class AplicarCoresTech {
    static applyTechColors(spanElement) {
        const cores = ['#ff667c', '#dd423e', '#a2a384', '#eac388', '#c5ad4b'];

        const palavras = spanElement.textContent.split(' ');

        spanElement.innerHTML = palavras
            .map((palavra, i) => {
                const cor = cores[i % cores.length];
                return `<span class="circle" style="--circle-color: ${cor};">${palavra}</span>`;
            })
            .join('');
    }
}

export default AplicarCoresTech;