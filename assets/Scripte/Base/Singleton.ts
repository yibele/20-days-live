
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Singleton')
export class Singleton extends Component {

    private static _instance = null;

    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this();
        }

        return this._instance;
    }
}

