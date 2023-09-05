export const Scenes = {
    Preload: "preload",
    Boot: "boot",
    Main: "main",
};

export const GameState = {
    Unknown: "unknown",
    Game: "game",
    Win: "win",
};

export const COLS = 9;
export const ROWS = 8;
export const getDiamondCount = () => Math.floor(Math.random() * 20 + 10);

export const POPUP_SHOW_DURATION = 200;
