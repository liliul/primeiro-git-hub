interface Book {
	title: string
	pages: number
	author: string 
}

// Pick reaproveita so as typagem escolidas pelo pick
const book1: Pick<Book, "title"> = {title: "typescript"}
const book2: Pick<Book, "pages" | "author"> = {pages: 110, author: "naruto"}

console.log(book1, book2)
