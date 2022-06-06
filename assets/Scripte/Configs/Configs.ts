
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
export const ENEMY_IN_VIEW_DIS = 350;
//子弹速度
export const BULLET_SPEED = 5;

// 所有特效设置
const STORM_EXIT_TIME = 2;
const STORM_SPEED = 5;
const STORM_DAMAGE = 30;
const STORM_INTERVAL = 5;
export const STORM_CONFIG = {
    STORM_EXIT_TIME, STORM_SPEED, STORM_DAMAGE, STORM_INTERVAL
}

/*********** 钻石相关设置，经验相关设置**********/
// 钻石吸收的距离
export const ZUANSHI_XISHOU_LEN = 20;
//每颗钻石经验
export const ZUANSHI_JINGYAN = 20;


/** 技能相关的设定 */
export const AWARDS = {
    'JINENG': {

    },
    "SHUXING": {

    }
}