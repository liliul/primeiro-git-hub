interface Icallback {
    nome: string
    callback: (mensagem: string) => void 
}

function CallBack({nome, callback}: Icallback): void {
   const msg = 'Ola ' + nome

   callback(msg)
}

function mensagem(mensagem: string): void {
    if (!mensagem) return

    const msgUpperCase = mensagem.toUpperCase()

    return console.log(msgUpperCase)
}

CallBack({nome: 'Naruto Uzumaki', callback: mensagem})

// -------------------------------------------------------- //

interface AnimeCallback {
    id: number
    nome: string 
    anime: string 
    author: string 
    origem: string 
    description: string 
    isperadoEm: string[] | string
}

// interface FunctionCallbacks {
//     chucksJson: (original: object | string[], primeiro: object | string[], segunda: object | string[]) => void 
// }
type FunctionCallbacks = (
    original: object | string[],
    primeiro: object | string[],
    segunda: object | string[]
) => void;

function QualAnime(
    {id, nome, anime, author, origem, description, isperadoEm}: AnimeCallback, 
    chucksJson: FunctionCallbacks
): void {


    const construirJson: object = {
        id: id,
        nome: nome,
        anime: anime,
        author: author,
        origem: origem,
        description: description,
        isperadoEm: isperadoEm
    }

    const primeirasInfos: Omit<AnimeCallback, 'origem' | 'description' | 'isperadoEm'> = {
        id: id,
        nome: nome,
        anime: anime,
        author: author
    }
    const segundaInfos: Omit<AnimeCallback, 'id' | 'nome' | 'anime' | 'author'> = {
        origem: origem,
        description: description,
        isperadoEm: isperadoEm
    }

    chucksJson(construirJson, primeirasInfos, segundaInfos)
}

function chucksJson(original: object | string[], primeiro: object | string[], segunda: object | string[]): void {
    console.log('original: ', original);
    console.log('primeiro chuck: ', primeiro);
    console.log('segundo chuck: ', segunda);  
    console.log('juntando primeiro e segunda: ', {...primeiro, ...segunda});
    
}

QualAnime({
    id: 1,
    nome: 'Naruto tokyo tv',
    anime: 'naruto classico',
    author: 'Masashi kishimoto',
    origem: 'JP',
    description: 'Naruto classico é um anime japones feito pelo mangaka "Masashi kishimoto"',
    isperadoEm: [
        'dragon ball',
        'dragon ball z',
        'super 11',
        'cavaleiros do zodioco',
        'hiyo hiyo oh'
    ]
},
chucksJson
)