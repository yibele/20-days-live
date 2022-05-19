
import { _decorator, Component, Node, Prefab, instantiate, view, Vec3 } from 'cc';
import { Enemy } from '../Base/Enemy';
import { EVENT_TYPE } from '../Base/Enums';
import { ENMEY_PER_WAVE, ENMEY_SPWAN_TIME } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

/**
 * 刷怪控制器
 */
@ccclass('SpwanManager')
export class SpwanManager extends Component {
    private enemy: Node = null;
    private i = 0;

    init() {
        // 保存节点
        Datamanager.Instance.SpwanManager = this;
        // 注册事件
        EventManger.Instance.on(EVENT_TYPE.SPWAN_ENEMY, this.createEnemy, this)
        this.handleSchlder();
        this.spwanEnemy();
    }

    createEnemy() {
        // 随机生成位置
        let pos = new Vec3();
        const plyaerPos = Datamanager.Instance.Player.getPlayer().getPosition()
        // 刷新点设置在玩家视野外的某个点
        for (let i = 0; i < ENMEY_PER_WAVE; i++) {
            // pos.x = plyaerPos.x + view.getVisibleSize().width * (2 * Math.random() - 1);
            // pos.y = plyaerPos.y + view.getVisibleSize().height * (2 * Math.random() - 1);
            // 首先生成1-2的一个数字，
            let t = Math.random() + 0.5;
            let z = Math.random() + 0.5;
            // 随机生成-1 或者 1
            let f = 1;
            if (t < 0.75) {
                f = 1;
            } else {
                f = -1;
            }
            // 指定随机位置
            pos.x = plyaerPos.x + view.getVisibleSize().width * f * t;
            pos.y = plyaerPos.y + view.getVisibleSize().height * f * z;
            let enemy = null;

            if (this.enemy === null) {
                // 获取enemyPrefab
                let prefab = Datamanager.Instance.Prefabs.find(i => i.data.name === 'Enemy1')
                enemy = instantiate(prefab);
            } else {
                enemy = instantiate(this.enemy)
            }
            // 设置enemy ID；
            enemy.getComponent(Enemy)._enemyId = this.i;
            this.i++;
            // 设置位置
            enemy.setPosition(pos)
            // 设置parent
            enemy.setParent(this.node);
        }
    }

    spwanEnemy() {
        EventManger.Instance.emit(EVENT_TYPE.SPWAN_ENEMY)
    }

    handleSchlder() {
        this.schedule(this.spwanEnemy, 8)
    }

}
