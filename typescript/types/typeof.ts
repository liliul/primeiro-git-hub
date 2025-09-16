const icons = {
	"img1": "/assetes/01.svg",
	"img2": "/assetes/02.svg",
	"img3": "/assetes/03.svg",
}

type Icon = typeof icons

// keyof estrai a chave do typeof
const icon: keyof Icon = "img2"
console.log(icon) // img2