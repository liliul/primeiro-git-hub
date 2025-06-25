const textoCor = "#fa7f72";
const cardHoverCor = "#E9967A";
const txtPskills = "#111111";

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
            'javascript', 'html', 'css/sass', 'firebase', 'typescript'
        ],
        iframe: 'https://climatempo-6f654.web.app/'
    },
    {
        title: "Testando cards infos",
        description: "cards user teste infos teste",
        snapshot: "./assets/artista-1.png",
        linguages: [

        ],
        iframe: 'https://naruto-classico.firebaseapp.com/'
    },
    {
        title: "Testando cards infos",
        description: "cards user teste infos teste",
        snapshot: "./assets/artista-1.png",
        linguages: [
            'tailwindcss', 'html', 'firebase'
        ],
        iframe: 'https://liliul.github.io/blogr-landing-page/'
    }
]


const contatosMenu = `
			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/map-pin.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Localidade</span>
					<span id="followers" class="text numStyle">Brasil</span>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/github.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">github</span>
					<a href="https://www.github.com/liliul" target="_blank" class="text numStyle">liliul</a>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/linkedin.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Linkedin</span>
					<a href="https://www.linkedin.com/in/liliu-lililzers-5bb4b8189" target="_blank" class="text numStyle">@Liliu</a>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>

			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/mail.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Email</span>
					<span class="text numStyle">@liliuContato</span>

					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>
			
			<li class="m-li">
				<div>
					<img class="iconMenuSize" src="./assets/folder.svg">
				</div>
				
				<div class="m-li-contato">
					<span class="text">Curriculo</span>
					<a href="#" target="_blank" class="text numStyle">liliu</a>

					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" >
      					<path d="M15 1v6h-2V4.41L7.41 10 6 8.59 11.59 3H9V1zm-4 10a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V3H5a3 3 0 00-3 3v5a3 3 0 003 3h5a3 3 0 003-3V9h-2z"></path>
    				</svg>
				</div>
			</li>
        `


const experienciaMenu = [
	{
		img : './assets/globe.svg',
		nome : 'Liliul Fundação Brasil',
		data : 'mai de 2020 - set de 2022',
		oquefaz : 'Desenvolvi uma feature no frontend',
		competencia : 'TypeScript, React, Next.js',
		atuacao : 'Pleno Desenvolvedor',
		fezoque : 'Frontend'
	},
	{
		img : './assets/artista-1.png',
		nome : 'Google alfa.',
		data : 'jun de 2023 - out de 2025',
		oquefaz : 'Desenvolvimento de data center e ia',
		competencia : 'Rust, GoLang, C/C++, Linux',
		atuacao : 'Sinior Desenvolvedor',
		fezoque : 'Backend linux server inteligencia artificial.'
	},
	{
		img : './assets/globe.svg',
		nome : 'Google alfa.',
		data : 'jun de 2023 - out de 2025',
		oquefaz : 'Desenvolvimento de data center e ia',
		competencia : 'Rust, GoLang, C/C++, Linux',
		atuacao : 'Sinior Desenvolvedor',
		fezoque : 'Backend linux server inteligencia artificial.'
	},
	{
		img : './assets/globe.svg',
		nome : 'Google alfa.',
		data : 'jun de 2023 - out de 2025',
		oquefaz : 'Desenvolvimento de data center e ia',
		competencia : 'Rust, GoLang, C/C++, Linux',
		atuacao : 'Sinior Desenvolvedor',
		fezoque : 'Backend linux server inteligencia artificial.'
	}
]


export const userConfig = {
    textoCor,
    cardHoverCor,
    txtPskills,
    profileLogo,
    nomeBio,
    skillsTech,
    cardInfos,
    contatosMenu,
	experienciaMenu
}