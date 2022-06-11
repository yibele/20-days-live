import { _decorator, Component, Node, instantiate } from 'cc';
import { CHECK_POINT_AWARD_CONTENT, EVENT_TYPE } from '../Base/Enums';
import { CHECK_POINT_AWARD_LEN } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
import { CheckPointAward } from './CheckPointAward';
const { ccclass, property } = _decorator;

export interface ICheckPointWard {
    type: CHECK_POINT_AWARD_CONTENT,
    img: string
}

@ccclass('UImanager')
export class UImanager extends Component {

    private _arwards: Array<string> = new Array();
    private _upgradeAwardAboard: Node = null;
    private checkPointAwardLen: number = CHECK_POINT_AWARD_LEN;

    init() {
        Datamanager.Instance.uiManager = this;
        const upgradeAwardAborad = Datamanager.Instance.Prefabs.find(i => i.data.name === 'CheckPointAward')
        this._upgradeAwardAboard = instantiate(upgradeAwardAborad)
        EventManger.Instance.on(EVENT_TYPE.SHOW_UPGRADE_AWARD, this.showAward, this)
    }


    /**
     * 6.8 生成思路
     * 1、首先判断激活特效是否小于6
     */
    generateSpacileAwards() {
        // 判断激活特效是否小于最大技能持有特效
        if (SchudleHandler.Instance.getActiveEffect().size <= 3) {
            const effects = Datamanager.Instance.effect;
            const random = Math.floor(Math.random() * effects.length)

        } else if (SchudleHandler.Instance.getActiveEffect().size > 3 && SchudleHandler.Instance.getActiveEffect().size <= 6) {

        } else {

        }

    }

    /**
     * 获取奖励的信息，和内容
     */
    generateAwards() {
        // 1、当前玩家所具备的技能数量是否小于6个，
        if (SchudleHandler.Instance.getActiveEffect().size < 0) {
            // 如果小于6个，那就显示混合选项

        } else {
            // 如果大于6个，那就只显示属性选项
            // 获取三个值，从奖励中选取后，显示
            const t = Datamanager.Instance.EnemyInView.length;
            let a = t + 2;
            let b = a + 2;
            let c = b + 2;

            const awardList: Array<ICheckPointWard> = [
                this.awardNumToEnum(a % this.checkPointAwardLen),
                this.awardNumToEnum(b % this.checkPointAwardLen),
                this.awardNumToEnum(c % this.checkPointAwardLen),
            ]

            Datamanager.Instance.awardList = awardList;
            this._upgradeAwardAboard.getComponent(CheckPointAward).init();
        }
    }

    awardNumToEnum(a: number) {
        switch (a) {
            case 0:
                return {
                    type: CHECK_POINT_AWARD_CONTENT.PWOER,
                    img: "PWOER"
                }
            case 1:
                return {
                    type: CHECK_POINT_AWARD_CONTENT.SPEED,
                    img: "SPEED"
                }
            case 2:
                return {
                    type: CHECK_POINT_AWARD_CONTENT.LIFE,
                    img: "LIFE"
                }
            case 3:
                return {
                    type: CHECK_POINT_AWARD_CONTENT.AMOR,
                    img: "AMOR"
                }
            case 4:
                return {
                    type: CHECK_POINT_AWARD_CONTENT.HANDE,
                    img: "HANDE"
                }
            case 5:
            // return CHECK_POINT_AWARD_CONTENT.LUCK
            case 6:
            // return CHECK_POINT_AWARD_CONTENT.COUT_DAMAGE
            case 7:
            // return CHECK_POINT_AWARD_CONTENT.COUT
            case 8:
            // return CHECK_POINT_AWARD_CONTENT.FIRE_INTERVAL
            default:
                return {
                    type: CHECK_POINT_AWARD_CONTENT.PWOER,
                    img: "PWOER"
                }
        }
    }

    // 显示通关奖励
    showAward() {
        // 随机获取奖励选项
        // 编辑内容显示
        this.generateAwards();
        this._upgradeAwardAboard.active = true;
        this._upgradeAwardAboard.setParent(Datamanager.Instance.RootNode)
    }

    onDestroy() {
        EventManger.Instance.off(EVENT_TYPE.SHOW_UPGRADE_AWARD, this.showAward)
    }

}

