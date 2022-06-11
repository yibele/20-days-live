import { _decorator, Component, Node, Label, EventTouch, Sprite, SpriteFrame } from 'cc';
import { CHECK_POINT_AWARD_CONTENT, EVENT_TYPE } from '../Base/Enums';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

@ccclass('CheckPointAward')
export class CheckPointAward extends Component {
    @property(Label)
    label1: Label = null;
    @property(Label)
    label2: Label = null;
    @property(Label)
    label3: Label = null;

    @property(Node)
    img1: Node = null;
    @property(Node)
    img2: Node = null;
    @property(Node)
    img3: Node = null;

    @property(SpriteFrame)
    Speed: SpriteFrame = null;
    @property(SpriteFrame)
    PWOER: SpriteFrame = null;
    @property(SpriteFrame)
    LIFE: SpriteFrame = null;
    @property(SpriteFrame)
    HANDE: SpriteFrame = null;
    @property(SpriteFrame)
    AMOR: SpriteFrame = null;

    private _award: CHECK_POINT_AWARD_CONTENT = null;

    onBtn(e: EventTouch, data: string) {
        switch (data) {
            case '1':
                this.award = Datamanager.Instance.awardList[0].type;
                break;
            case '2':
                this.award = Datamanager.Instance.awardList[1].type;
                break;
            case '3':
                this.award = Datamanager.Instance.awardList[2].type;
                break;
            default:
                break;
        }
    }

    set award(newAward: CHECK_POINT_AWARD_CONTENT) {
        this._award = newAward;
        switch (newAward) {
            case CHECK_POINT_AWARD_CONTENT.PWOER:
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_INCREASE_POWER, 0.15)
                break;
            case CHECK_POINT_AWARD_CONTENT.SPEED:
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_INCREASE_SPEED, 0.05)
                break;
            case CHECK_POINT_AWARD_CONTENT.LIFE:
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_INCREASE_LIFE, 0.15)
                break;
            case CHECK_POINT_AWARD_CONTENT.AMOR:
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_INCREASE_AMOUR, 1)
                break;
            case CHECK_POINT_AWARD_CONTENT.HANDE:
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_INCREASE_HANDE, 10)
                break;
            default:
                break;
        }
        this.node.active = false;
        EventManger.Instance.emit(EVENT_TYPE.RESUME_GAME)
    }

    init() {
        this.label1.string = Datamanager.Instance.awardList[0].type;
        this.img1.getComponent(Sprite).spriteFrame = this[Datamanager.Instance.awardList[0].img]
        this.label2.string = Datamanager.Instance.awardList[1].type;
        this.img2.getComponent(Sprite).spriteFrame = this[Datamanager.Instance.awardList[1].img]
        this.label3.string = Datamanager.Instance.awardList[2].type;
        this.img3.getComponent(Sprite).spriteFrame = this[Datamanager.Instance.awardList[2].img]
    }

}

