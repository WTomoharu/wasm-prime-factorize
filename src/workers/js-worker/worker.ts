import * as Comlink from "comlink"
import { primeFactorize } from "./lib"

export class Main {
  add(a: number, b: number) {
    return a + b
  }

  primeFactorize(N: bigint) {
    const digit = 17n

    console.log(`digits: ${N.toString().length}`)

    if (10n ** (digit) < N) {
      console.log(`The accepted numbers are too large.`)
      return []
    }

    return primeFactorize(N)
  }
}

Comlink.expose(new Main(), this)
