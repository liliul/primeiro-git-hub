function SemDuplicacao(err: number[]) {
}
const err1 = [1,2,1,2,1,3,3,3,3]
const arr = [...new Set(err1)]
console.log(arr)

// Log(`${arr}`)

function Log(msg: string) {
    return console.log(msg);
}

