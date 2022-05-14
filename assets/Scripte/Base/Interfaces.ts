import { Enemy } from "./Enemy"

export interface IEventFunc {
    func: Function,
    ctx?: unknown
}

export interface IEnmeys {
    name: string,
    ojbect: Enemy
}