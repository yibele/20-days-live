import { _decorator, Component, Node, instantiate } from 'cc';
import { EffectManager } from '../Effect/EffectManager';
import { Datamanager } from '../Runtime/Datamanager';
import { EFFECT_NAME_ENUM } from './Enums';
const { ccclass, property } = _decorator;

@ccclass('Effect')
export abstract class Effect extends Component {

    public Prefab: string = 'Prefab/Effect/'
    // 刷新时间
    public InternalTime: number = 0;
    // 存在时间
    public liveTime: number = 0;

    abstract init(): void;

    /**
     * 创建对象池
     */
    generateNodePool() {
        const prefab = Datamanager.Instance.Prefabs.find(i => i.data.name === this.Prefab)
        const node = instantiate(prefab)
        // 将特效保存在EffectManager中
        EffectManager.Instance.generatePool(EFFECT_NAME_ENUM.EFFECT_BULLET, node, 10)
    }

}

