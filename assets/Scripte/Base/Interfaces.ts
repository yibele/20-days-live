import { Enemy } from "./Enemy"
import { State } from "./State"

export interface IEventFunc {
    func: Function,
    ctx?: unknown
}

export interface IEnmeys {
    name: string,
    ojbect: Enemy
}

export interface IPrams {
    type: string,
    value: number | boolean
}
