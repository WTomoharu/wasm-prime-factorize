export function randomDigit(digit: number) {
  let value = crypto.getRandomValues(new BigUint64Array(1))[0]

  if (value < 10n ** BigInt(digit)) {
    throw "digits is too large"
  }

  while (!(10n ** BigInt(digit - 1) <= value && value < 10n ** BigInt(digit))) {
    value = value / 10n
  }

  return value
}

export function randomRamge(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}
