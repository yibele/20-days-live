import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { EVENT_TYPE } from '../Base/Enums';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
const { ccclass, property } = _decorator;

@ccclass('UImanager')
export class UImanager extends Component {

    private _arwards: Array<string> = new Array();
    private _upgradeAwardAboard: Node = null;


    init() {
        Datamanager.Instance.uiManager = this;
        const upgradeAwardAborad = Datamanager.Instance.Prefabs.find(i => i.data.name === 'CheckPointAward')
        this._upgradeAwardAboard = instantiate(upgradeAwardAborad)
        EventManger.Instance.on(EVENT_TYPE.SHOW_UPGRADE_AWARD, this.showAward, this)
    }

    onBtn(e) {
        Datamanager.Instance.puasTag = false;
    }

    /**
     * 获取奖励的信息，和内容
     */
    generateAwards() {
        // 1、当前玩家所具备的技能数量是否小于6个，
        if (SchudleHandler.Instance.getActiveEffect().size <= 6) {
            // 如果小于6个，那就显示混合选项
        } else {
            // 如果大于6个，那就只显示属性选项
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

