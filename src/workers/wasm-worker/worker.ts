import * as Comlink from "comlink"

const wasm = WebAssembly.instantiateStreaming(fetch('/main.wasm'), {
  env: {}
}).then(res => res.instance.exports)

export class Main {
  async add(a: number, b: number): Promise<number> {
    return (await wasm as any).add(a, b)
  }

  async primeFactorize(N: bigint): Promise<bigint[]> {
    const { memory } = await wasm as { memory: WebAssembly.Memory }
    const { prime_factorize, get_array_len } = await wasm as any

    const digit = 17n

    console.log(`digits: ${N.toString().length}`)

    if (10n ** (digit) < N) {
      console.log(`The accepted numbers are too large.`)
      return []
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
