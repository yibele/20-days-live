
import { _decorator, Component, Node, resources, SpriteFrame, Prefab } from 'cc';
import { Singleton } from '../Base/Singleton';
const { ccclass, property } = _decorator;

type SpriteOrPrefab = SpriteFrame | Prefab;

@ccclass('AssetManager')
export class AssetManager extends Singleton {

    static get Intance() {
        return super.getInstance<AssetManager>();
    }

    loadPrefab(path: string) {
        return new Promise<Prefab[]>((resolve, reject) => {
            resources.loadDir(path, Prefab, function (err, asset) {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(asset)
            })
        })
    }
}


