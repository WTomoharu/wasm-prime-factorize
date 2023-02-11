export function primeFactorize(N: bigint): bigint[] {
  let array_list: bigint[] = [];

  let n: bigint = N;
  let p: bigint = 2n;

  while (p * p <= n) {
      if (n % p === 0n) {
          while (n % p === 0n) {
              n = n / p;
              array_list.push(p);
          }
      }

      p += 1n;
  }

  if (n !== 1n) {
      array_list.push(n);
  }

  return array_list;
}