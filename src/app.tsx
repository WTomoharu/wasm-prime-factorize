import { useState } from "react"
import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { LoadableButton } from "./components/loadable-button"
import { JsWorker } from "./workers/js-worker/client"
import { WasmWorker } from "./workers/wasm-worker/client"
import { Candidates } from "./components/candidates"

function formatTime(time: number) {
  if (1000 <= time) {
    return (time / (10 ** 3)).toFixed(2) + "秒"
  } else {
    return (time / (10 ** 3)).toFixed(3) + "秒"
  }
}

function formatPrimeNumbers(numbers: bigint[]) {
  return numbers.map(n => n.toString()).join(" × ")
}


type Result = {
  type: "Wasm" | "JS"
  time: number
  source: bigint
  numbers: bigint[]
}

export const App = () => {
  const [value, setValue] = useState("67447397074609339")

  const [results, setResults] = useState<Result[]>([])

  const pushResult = (result: Result) => {
    setResults(results => [...results, result])
  }

  const [isOpenResultModal, setIsOpenResultModal] = useState(false)

  const openResultModal = () => {
    if (isOpenResultModal) {
      setIsOpenResultModal(false)
      setIsOpenResultModal(true)
    } else {
      setIsOpenResultModal(true)
    }
  }

  const closeResultModal = () => {
    setIsOpenResultModal(false)
  }

  const [errors, setErrors] = useState<Error[]>([])

  const pushError = (error: Error) => {
    setErrors(errors => [...errors, error])
  }

  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false)

  const openErrorModal = () => {
    if (isOpenErrorModal) {
      setIsOpenErrorModal(false)
      setIsOpenErrorModal(true)
    } else {
      setIsOpenErrorModal(true)
    }
  }

  const closeErrorModal = () => {
    setIsOpenErrorModal(false)
  }


  return (
    <Box maxW="400px" mx="auto">
      <Heading
        as='h1'
        size='lg'
        textAlign="center"
        mt="2"
        mb="4"
      >
        一京桁を素因数分解したい！
      </Heading>
      <Box
        m="2"
      >
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          type="number"
        />
      </Box>

      <Candidates
        mb="4"
        value={value}
        onClick={(type, value, e) => {
          setValue(value.toString())
        }}
      />

      <Grid
        templateColumns='1fr 1fr'
      >
        <LoadableButton
          m="2"
          h="80px"
          fontSize="2xl"
          onClick={async () => {
            const start = performance.now()
            const numbers = await JsWorker.primeFactorize(BigInt(value)).catch(err => {
              pushError(err)
              openErrorModal()
              throw err
            })
            const end = performance.now()

            pushResult({ type: "JS", time: end - start, source: BigInt(value), numbers })
            openResultModal()
          }}
        >
          JS Worker
        </LoadableButton>
        <LoadableButton
          m="2"
          h="80px"
          fontSize="2xl"
          onClick={async () => {
            const start = performance.now()
            const numbers = await WasmWorker.primeFactorize(BigInt(value)).catch(err => {
              pushError(err)
              openErrorModal()
              throw err
            })
            const end = performance.now()

            pushResult({ type: "Wasm", time: end - start, source: BigInt(value), numbers })
            openResultModal()
          }}
        >
          Wasm Worker
        </LoadableButton>
      </Grid>

      {0 < results.length && (
        <Modal isOpen={isOpenResultModal} onClose={closeResultModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{results[results.length - 1].type}での結果({formatTime(results[results.length - 1].time)})</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {formatPrimeNumbers(results[results.length - 1].numbers)}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={closeResultModal}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {0 < errors.length && (
        <Modal isOpen={isOpenErrorModal} onClose={closeErrorModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>エラー</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {errors[errors.length - 1].toString()}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={closeErrorModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}
