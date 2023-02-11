import { JsWorker } from "./workers/js-worker/client"
import { WasmWorker } from "./workers/wasm-worker/client"

export const App = () => {
  return (
    <>
      <h1>App</h1>
      <button onClick={() => JsWorker.add(2, 1).then(console.log)}>
        JS Worker
      </button>
      <button onClick={() => WasmWorker.add(2, 1).then(console.log)}>
        Wasm Worker
      </button>
    </>
  )
}
