import { Box, Button, ComponentWithAs, StackProps } from "@chakra-ui/react"
import MersennePrimeNumbers from "../assets/prime-numbers.json"
import { randomDigit, randomRamge } from "../utils/random"

function primeNumber() {
  return BigInt(MersennePrimeNumbers[randomRamge(0, MersennePrimeNumbers.length - 1)])
}

export type CandidatesProps = Omit<StackProps, "onClick"> & {
  value?: string
  onClick?(type: string, value: bigint, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

export const Candidates: ComponentWithAs<"div", CandidatesProps> = ({ children, onClick, ...props }) => {
  return (
    <Box textAlign="center" mx="1" {...props}>
      <Button mx="1" px="2" py="0" fontSize="sm" onClick={e => {
        const element = e.target as HTMLButtonElement
        const value = randomDigit(10)
        onClick?.(element.textContent ?? "", value, e)
      }}>
        10桁(乱数)
      </Button>
      <Button mx="1" px="2" py="0" fontSize="sm" onClick={e => {
        const element = e.target as HTMLButtonElement
        const value = randomDigit(17)
        onClick?.(element.textContent ?? "", value, e)
      }}>
        17桁(乱数)
      </Button>
      <Button mx="1" px="2" py="0" fontSize="sm" onClick={e => {
        const element = e.target as HTMLButtonElement
        let value: bigint
        while (true) {
          value = primeNumber()
          if (value.toString() !== props.value) break
        }
        onClick?.(element.textContent ?? "", value!, e)
      }}>
        17桁(素数)
      </Button>
    </Box>
  )

}