import { WasmWorker } from "../workers/wasm-worker/client"
import { randomDigit } from "./random"

export async function generatePrimeNumbers(digit: number) {
  return Promise.all(Array.from({ length: 100 }).map(async () => {
    const random = randomDigit(digit)
    const res = await WasmWorker.primeFactorize(BigInt(random))
    return [res.length, random, res] as const
  })).then(array => (
    array.filter(([len]) => len === 1).map(([_, value]) => value)
  ))
}
