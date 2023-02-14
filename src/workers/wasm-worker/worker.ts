import * as Comlink from "comlink"
import { WebAssemblyMainExports } from "./wasm"

const wasm = WebAssembly.instantiateStreaming(fetch(import.meta.env.BASE_URL + 'main.wasm'), {
  env: {}
}).then(res => res.instance.exports as WebAssemblyMainExports)

export class Main {
  async add(a: number, b: number): Promise<number> {
    return (await wasm).add(a, b)
  }

  async primeFactorize(N: bigint): Promise<bigint[]> {
    const { memory, prime_factorize, get_array_len } = await wasm

    const digit = 17n

    if (10n ** (digit) < N) {
      throw `The accepted numbers are too large. digits: ${N.toString().length}`
    }

    const pointer = prime_factorize(N)
    const len = get_array_len(pointer)

    const array = new BigUint64Array(
      memory.buffer,
      pointer,
      len,
    )

    return Array.from(array)
  }
}

Comlink.expose(new Main(), this)
