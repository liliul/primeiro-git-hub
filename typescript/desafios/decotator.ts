type AnyFunction = (...args: any[]) => any

function withLogging<T extends AnyFunction>(fn: T): T {
  return function (...args: Parameters<T>): ReturnType<T> {
    console.log(`Chamando com:`, args)
    const result = fn(...args)
    console.log(`Resultado:`, result)
    return result
  } as T
}

const sum = (a: number, b: number): number => a + b
const loggedSum = withLogging(sum)
loggedSum(2, 3)