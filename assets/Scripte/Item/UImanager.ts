import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { CHECK_POINT_AWARD_CONTENT, EVENT_TYPE } from '../Base/Enums';
import { CHECK_POINT_AWARD_LEN } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
import { CheckPointAward } from './CheckPointAward';
const { ccclass, property } = _decorator;

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
     * 获取奖励的信息，和内容
     */
    generateAwards() {
        // 1、当前玩家所具备的技能数量是否小于6个，
        if (SchudleHandler.Instance.getActiveEffect().size <= 0) {
            // 如果小于6个，那就显示混合选项

        } else {
            // 如果大于6个，那就只显示属性选项
            // 获取三个值，从奖励中选取后，显示
            const t = Datamanager.Instance.EnemyInView.length;
            let a = t + 2;
            let b = a + 2;
            let c = b + 2;

            const awardList: Array<CHECK_POINT_AWARD_CONTENT> = [
                this.awardNumToEnum(a % 3),
                this.awardNumToEnum(b % 3),
                this.awardNumToEnum(c % 3),
            ]
            Datamanager.Instance.awardList = awardList;
            this._upgradeAwardAboard.getComponent(CheckPointAward).init();
        }
    }

    awardNumToEnum(a: number) {
        switch (a) {
            case 0:
                return CHECK_POINT_AWARD_CONTENT.PWOER
            case 1:
                return CHECK_POINT_AWARD_CONTENT.SPEED
            case 2:
                return CHECK_POINT_AWARD_CONTENT.LIFE
            case 3:
            // return CHECK_POINT_AWARD_CONTENT.AMOR
            case 4:
            // return CHECK_POINT_AWARD_CONTENT.HANDE
            case 5:
            // return CHECK_POINT_AWARD_CONTENT.LUCK
            case 6:
            // return CHECK_POINT_AWARD_CONTENT.COUT_DAMAGE
            case 7:
            // return CHECK_POINT_AWARD_CONTENT.COUT
            case 8:
            // return CHECK_POINT_AWARD_CONTENT.FIRE_INTERVAL
            default:
                return CHECK_POINT_AWARD_CONTENT.PWOER
                break;
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

