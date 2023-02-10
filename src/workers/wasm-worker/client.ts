import * as Comlink from "comlink"
import Worker from './worker?worker'
import type { Main as WorkerType } from "./worker";

export const WasmWorker = Comlink.wrap<WorkerType>(new Worker())
