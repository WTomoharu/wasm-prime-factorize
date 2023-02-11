import { useState } from "react"
import { JsWorker } from "./workers/js-worker/client"
import { WasmWorker } from "./workers/wasm-worker/client"

export const App = () => {
  const [num, setNum] = useState(67447397074609339n)
  return (
    <>
      <h1>App</h1>
      <div>
        <input
          value={num.toString()}
          onChange={e => setNum(BigInt(e.target.value))}
        />
      </div>
      <div>
        <button onClick={() => {
          Promise.resolve().then(async () => {
            const start = performance.now()
            const res = await JsWorker.primeFactorize(num)
            const end = performance.now()
            console.log("js", end - start, res)
          })
        }}>
          JS Worker
        </button>
        <button onClick={() => {
          Promise.resolve().then(async () => {
            const start = performance.now()
            const res = await WasmWorker.primeFactorize(num)
            const end = performance.now()
            console.log("wasm", end - start, res)
          })
        }}>
          Wasm Worker
        </button>
      </div>
    </>
  )
}
