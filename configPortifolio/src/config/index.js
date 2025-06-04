const textoCor     = "#fa7f72";
const cardHoverCor = "#E9967A";
const txtPskills   = "#111111";

const profileLogo = { 
    profile: '',
    profileDefault: './assets/artista-1.png'
}

const nomeBio = {
    name: 'Liliul', 
    bio: `
        Meu nome é Liliul e sou desenvolvedor Full Stack. 
        Crio aplicações web completas utilizando JavaScript, Node.js,
        MySQL e Docker, com foco em desempenho e organização. 
        Confira meus projetos ou entre em contato para colaborarmos!
    `
}

const skillsTech = [
    'Javascript',
    'html/css/sass',
    'node',
    'typescript',
    'php',
    'react',
    'firebase',
    'git/github',
    'docker/compose'      
];

const cardInfos = [
    {
        title: "Testando cards infos",
        description: "cards user teste infos teste",
        snapshot: "./assets/artista-1.png",
        linguages: [
            'javascript','html','css/sass','firebase','typescript'
        ]
    },
    {
        title: "Testando cards infos",
        description: "cards user teste infos teste",
        snapshot: "./assets/artista-1.png",
        linguages: [
            
        ]
    }
]

export const userConfig = {
    textoCor,
    cardHoverCor,
    txtPskills,
    profileLogo,
    nomeBio,
    skillsTech,
    cardInfos
}