interface IndexArray {
    index1: number
    index2: number
    index3: number
}

function bigO({index1, index2, index3}: IndexArray): string[] {
  let arr: string[] = ['asdasd','bbbbb','kkkkk']

  console.log(arr[index1], arr[index2], arr[index3])

  return arr
}

bigO({index1: 1, index2: 2, index3: 0})