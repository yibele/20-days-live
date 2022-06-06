
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
    PLAYER_INCREASE_LIFE = "PLAYER_INCREASE_LIFE"
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
