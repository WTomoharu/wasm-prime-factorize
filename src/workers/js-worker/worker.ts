import * as Comlink from "comlink"

export class Main {
  add(a: number, b: number) {
    return a + b
  }
}

Comlink.expose(new Main(), this)
