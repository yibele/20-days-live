
export enum EVENT_TYPE {
    SPWAN_ENEMY = "SPWAN_ENEMY",
    PLAYER_MOVE = "PLAYER_MOVE",
    PLAYER_HURT = "PLAYER_HURT",
    RESET_PARAMS = "RESET_PARAMS",
    PLAYER_FIRE = "PLAYER_FIRE",
    GET_ENEMY = "GET_ENEMY",
    PUSH_ENEMY = 'PUSH_ENEMY',
    PLAYER_UPGRADE = "PLAYER_UPGRADE",
    SHOW_UPGRADE_AWARD = "SHOW_UPGRADE_AWARD",
    PLAYER_INCREASE_SPEED = 'PLAYER_INCREASE_SPEED',
    PLAYER_INCREASE_LIFE = "PLAYER_INCREASE_LIFE",
    CANCLE_EFFECT_SCHUDLE = "CANCLE_EFFECT_SCHUDLE",
    CANCLE_SPWAN_ENEMY_SCHUDLE = "CANCLE_SPWAN_ENEMY_SCHUDLE"
}

// 增加的类型，如 增加生命的话，是按照百分比增加还是按照数值增加
export enum INCRESE_TYPE {
    PERSENT = "PERSENT",
    NUMBER = "NUMBER"
}

// 有限状态机中的Pamras类型
export enum PARAMS_ENUM_TYPE {
    TRIGER = "TRIGER",
    NUMBER = "NUMBER"
}

// 有限状态机中的状态类型
export enum STATE_ENUM_TYPE {
    IDLE = "IDLE",
    RUN = "RUN"
}

export enum ENTITY_TAG_ENUM {
    ENMEY = 1,
    PLAYER = 2,
    BULLET = 3,
    STORM = 4
}

export enum PLAYER_ANIMATION_ENUM {
    IDLE = "IDLE",
    RUN = "RUN"
}

export enum EFFECT_NAME_ENUM {
    EFFECT_BULLET = "EFFECT_BULLET",
    STORM = "STORM"
}

/** 技能升级之后的奖励类型 */
export enum AWARD_ENUM {
    JINENG = "JINENG", // 技能部分
    SHUXING = "SHUXING" // 属性部分
}

export enum CHECK_POINT_AWARD_CONTENT {
    PWOER = "攻击力 +15%",
    SPEED = "移动速度 +15%",
    LIFE = "生命值 +15%",
    AMOR = "护甲 +2",
    HANDE = "拾取距离 +1",
    LUCK = "幸运值 +2",
    COUT_DAMAGE = "暴击伤害 +15%",
    COUT = "暴击几率 +5",
    FIRE_INTERVAL = '攻击速度 +15%',
}

export enum CHECK_POINT_SPECLE_AWARD {

}


