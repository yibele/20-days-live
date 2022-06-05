import { _decorator, Component, Node, Prefab, instantiate, v3, Label } from 'cc';
import { Singleton } from '../Base/Singleton';
import { Datamanager } from '../Runtime/Datamanager';
import { Zuanshi } from './Zuanshi';
const { ccclass, property } = _decorator;

@ccclass('ZuanshiManager')
export class ZuanshiManager extends Singleton {
    private _zuanshiPool: Array<Node> = new Array();
    private _prefab: Prefab = null;
    private _initTag: boolean = false;
    private _jingyantiao: Node = null;
    private _lv: Label = null;

    static get Instance() {
        return super.getInstance<ZuanshiManager>()
    }

    init() {
        this._prefab = Datamanager.Instance.Prefabs.find(i => i.data.name === 'zuanshi')
        // 游戏开始的时候，先创建30个钻石，放在屏幕外面
        for (let i = 0; i < 30; i++) {
            const node = this.generateZuanshi();
            this._zuanshiPool.push(node)
        }
    }

    generateZuanshi() {
        const node = instantiate(this._prefab)
        const sp = node.addComponent(Zuanshi)
        sp.init();
        return node;
    }

    getZuanshi() {
        if (!this._initTag) {
            this.init();
        }
        if (this._zuanshiPool.length > 0) {
            const node = this._zuanshiPool.pop();
            node.getComponent(Zuanshi).activeTag = true;
            return node;
        } else {
            return this.generateZuanshi();
        }
    }

    pushZuanshi(zuanshi: Node) {
        zuanshi.setPosition(v3(3000, 3000, 0))
        this._zuanshiPool.push(zuanshi)
    }

}

