function descobrirLetra(posicao: number) {
    const padrao: string = "cafe";
    const tamanho: number = padrao.length;

    // O operador % (módulo) encontra o resto da divisão.
    // Subtraímos 1 e somamos 1 para ajustar o índice que no JavaScript começa em 0.
    const indice: number = (posicao - 1) % tamanho;

    return padrao[indice];
}

const posicaoDesejada = 2022;
const letraProcurada = descobrirLetra(posicaoDesejada);

console.log(`A letra que ocupa a posição ${posicaoDesejada} é: "${letraProcurada}"`);
