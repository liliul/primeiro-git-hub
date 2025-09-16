interface Book {
	title: string
	pages: number
	author: string
	discription: string
}

// Omit omitirar todos em Book estar no Omit
const book : Omit<Book, "discription" | "pages" | "author"> = {title: "Naruto Classico"} 

console.log(book)