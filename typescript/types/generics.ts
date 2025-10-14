// function states() {
// 	let respose: string | number // inion

// 	function get() {
// 		return respose
// 	}

// 	function set(value: number | string) {
// 		return value
// 	}

// 	return {get, set}  
// }

// const userState = states()
// userState.get()
// const res = userState.set('Som goku')
// console.log(res)


function states<T extends string | number | (string | number)[]>() { 

	function get() {
		return 
	}

	function set(value: T) {
		return value
	}

	return {get, set}  
}

const userState = states()
userState.get()
const res1 = userState.set('Som goku')
const res2 = userState.set(500)
const res3 = userState.set(['vegeta', 'sasuke', 22, 32,15])

console.log(res1, res2, res3)