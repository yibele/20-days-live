import { _decorator, Component, Node } from 'cc';
import { EFFECT_NAME_ENUM } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
const { ccclass, property } = _decorator;
/**
 * @undo getEffect 上面的特效池中的特效数量不够的时候的处理
 */

@ccclass('EffectManager')
export class EffectManager extends Singleton {



    private _effectPool: Map<string, Array<Node>> = new Map();

    static get Instance() {
        return super.getInstance<EffectManager>();
    }

    /**
     * 如果已经有相应的特效池了，那么按照Size的要求再次添加，
     * 如果没有特效池，那么就直接生成一个
     * @param effectName 特效名
     * @param node 特效Node
     * @param size 特效池大小
     */
    generatePool(effectName: EFFECT_NAME_ENUM, node: Node, size: number) {
        if (this._effectPool.has(effectName) && this._effectPool.get(effectName).length < size) {
            // 循环从1开始
            for (let i = 1; i <= size - this._effectPool.get(effectName).length; i++) {
                this.pushEffect(effectName, node)
            }
        } else {
            for (let i = 1; i <= size; i++) {
                this.pushEffect(effectName, node)
            }
        }

    }

    pushEffect(name: EFFECT_NAME_ENUM, node: Node) {
        this._effectPool.get(name).push(node)
    }

    /**
     * 获取特效数量，需要注意的是，
     * 当特效池中的特效不够的时候，
     * 要直接生成特效返回 => 这部分还没有做
     * @param name 获取的特效名称
     * @returns 
     */
    getEffect(name: EFFECT_NAME_ENUM): Node {
        // 获得第一个元素
        let node = this._effectPool.get(name)[0]
        // 删除第一个元素
        this._effectPool.get(name).splice(0, 1)
        return node;
    }
}

