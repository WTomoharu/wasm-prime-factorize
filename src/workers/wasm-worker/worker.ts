import * as Comlink from "comlink"

const wasm = WebAssembly.instantiateStreaming(fetch('/main.wasm'), {
  env: {  }
}).then(res => res.instance)

export class Main {
  async add(a: number, b: number): Promise<number> {
    return (await wasm as any).exports.add(a, b)
  }
}

Comlink.expose(new Main(), this)