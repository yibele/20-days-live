
export enum EVENT_TYPE {
    SPWAN_ENEMY = "SPWAN_ENEMY",
    PLAYER_MOVE = "PLAYER_MOVE",
    PLAYER_HURT = "PLAYER_HURT",
    RESET_PARAMS = "RESET_PARAMS",
    PLAYER_FIRE = "PLAYER_FIRE"
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
    BULLET = 3
}

export enum PLAYER_ANIMATION_ENUM {
    IDLE = "IDLE",
    RUN = "RUN"
}

export enum EFFECT_NAME_ENUM {
    EFFECT_BULLET = "EFFECT_BULLET"
}
