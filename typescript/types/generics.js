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
function states() {
    var respose;
    function get() {
        return respose;
    }
    function set(value) {
        return value;
    }
    return { get: get, set: set };
}
var userState = states();
userState.get();
var res1 = userState.set('Som goku');
var res2 = userState.set(500);
var res3 = userState.set(['vegeta', 'sasuke']);
console.log(res1, res2, res3);
