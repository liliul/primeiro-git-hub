interface User {
	id: number
	name: string
	email: string
}

// normal da interface
// const user: User = {id: 1, name: 'naruto', email: 'uzumaki@email.com'}

// o partial torna toda interface User opcional para tipo reaproveitar User sem criar ou tipagem
const user: Partial<User> = {name: 'sasuke'}
console.log(user)