// export interface Ifactory {
// 	callback: string 
// 	classes: string 
// }

// funciona primeira parte

// export default function factory ({callback, classes}: Ifactory) {
// 	function textocallback() {
// 		console.log(callback)
// 	}

// 	function textoClasses() {
// 		console.log(classes)
		
// 	}

// 	return { textocallback, textoClasses}
// }


// ----------------------------------------- //

export interface Ifactory {
	callback: (txt: string) => void 
	classes: (txt: string) => void  
}

export default function factory ({callback, classes}: Ifactory) {
	function textocallback(txt: string) {
		callback(txt)
	}

	function textoClasses(txt: string) {
		classes(txt)
	}

	return { textocallback, textoClasses}
}