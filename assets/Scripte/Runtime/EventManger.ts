
import { _decorator, Component, Node } from 'cc';
import { EVENT_TYPE } from '../Base/Enums';
import { IEventFunc } from '../Base/Interfaces';
import { Singleton } from '../Base/Singleton';
import { Datamanager } from './Datamanager';
const { ccclass, property } = _decorator;

@ccclass('EventManger')
export class EventManger extends Singleton {

    private _eventDic: Map<string, IEventFunc[]> = new Map();

    static get Instance() {
        return super.getInstance<EventManger>();
    }

    on(eventName: EVENT_TYPE, func: Function, ctx?: unknown) {
        if (this._eventDic.has(eventName)) {
            this._eventDic.get(eventName).push({ func, ctx })
        } else {
            this._eventDic.set(eventName, [{ func, ctx }])
        }
    }

    off(eventName: EVENT_TYPE, func: Function) {
        if (this._eventDic.has(eventName)) {
            const index = this._eventDic.get(eventName).findIndex(i => i.func === func)
            this._eventDic.get(eventName).splice(index, 1)
        }
    }

    get(eventName: EVENT_TYPE) {
        if (this._eventDic.has(eventName)) {
            return this._eventDic.get(eventName)
        }
    }

    emit(eventName: EVENT_TYPE, ...params: unknown[]) {
        if (this._eventDic.has(eventName)) {
            this._eventDic.get(eventName).forEach(({ func, ctx }) => {
                ctx ? func.apply(ctx, params) : func(params)
            });
        } else {
            console.warn("相关方法未注册", eventName)
        }

    }

}

