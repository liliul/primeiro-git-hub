function palindromo(texto: string): boolean {
  const normalizado = texto.toLowerCase().replace(/[^a-z0-9]/g, "");

  let inicio = 0;
  let fim = normalizado.length - 1;

  while (inicio < fim) {
    if (normalizado[inicio] !== normalizado[fim]) {
      return false;
    }
    inicio++;
    fim--;
  }

  return true;
}

palindromo('arara')