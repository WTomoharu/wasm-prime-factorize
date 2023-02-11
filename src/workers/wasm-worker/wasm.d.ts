

export interface WebAssemblyMainExports extends WebAssembly.Exports {
  memory: WebAssembly.Memory

  add(a: number, b: number): number
  get_array_len(ptr: number): number
  prime_factorize(N: bigint): number
}