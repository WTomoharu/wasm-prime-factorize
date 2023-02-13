import { useState } from "react"
import { Box, Grid, Input } from "@chakra-ui/react"
import { LoadableButton } from "./components/loadable-button"
import { JsWorker } from "./workers/js-worker/client"
import { WasmWorker } from "./workers/wasm-worker/client"
import { Candidates } from "./components/candidates"

export const App = () => {
  const [value, setValue] = useState("67447397074609339")

  return (
    <Box maxW="400px" mx="auto">
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
            const res = await JsWorker.primeFactorize(BigInt(value))
            const end = performance.now()

            console.log("js", end - start, res)
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
            const res = await WasmWorker.primeFactorize(BigInt(value))
            const end = performance.now()

            console.log("wasm", end - start, res)
          }}
        >
          Wasm Worker
        </LoadableButton>
      </Grid>
    </Box>
  )
}
