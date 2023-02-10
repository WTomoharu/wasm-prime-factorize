import * as Comlink from "comlink"
import Worker from './worker?worker'
import type { Main as WorkerType } from "./worker";

export function main() {
  const Main = Comlink.wrap<WorkerType>(new Worker());
  return Main.add(0, 1)
}
