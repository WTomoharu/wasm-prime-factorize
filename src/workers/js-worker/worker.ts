import * as Comlink from "comlink"
import { primeFactorize } from "./lib"

export class Main {
  add(a: number, b: number) {
    return a + b
  }

  primeFactorize(N: bigint) {
    const digit = 17n

    if (10n ** (digit) < N) {
      throw `The accepted numbers are too large. digits: ${N.toString().length}`
    }

    return primeFactorize(N)
  }
}

Comlink.expose(new Main(), this)
