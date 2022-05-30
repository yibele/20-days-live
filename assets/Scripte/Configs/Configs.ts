import { IEnmeys } from "../Base/Interfaces";
import { Enemy1 } from "../Enemys/Enemy1";


//玩家初始速度
export const PLAYER_INIT_SPEED = 3;
//玩家初始生命
export const PLAYER_INIT_LIFE = 100;
// 生命条长度
export const LIFE_BAR_WIDTH = 50;
// 玩家开火初始间隔
const PLAYER_FIRE_INTERNAL = 1;

export const PLAYER_CONFIG = {
    PLAYER_INIT_SPEED,
    PLAYER_INIT_LIFE,
    PLAYER_FIRE_INTERNAL
}


// 敌人初始速度
export const ENMEY_INIT_SPPED = 2;
// 敌人初始攻击力
export const ENMEY_INIT_DAMAGE = 5;

export const Enemys = {
    ENMEY_INIT_SPPED,
    ENMEY_INIT_DAMAGE
}

// 敌人刷新间隔
export const ENMEY_SPWAN_TIME = 5;
// 每波敌人的个数
export const ENMEY_PER_WAVE = 10;
// 攻击范围(视野中敌人的距离)
export const ENEMY_IN_VIEW_DIS = 500;



//子弹速度
export const BULLET_SPEED = 5;