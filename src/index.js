import "phaser";
import { BootScene } from "./app/scenes/BootScene";
import { MainScene } from "./app/scenes/MainScene";
import { PreloadScene } from "./app/scenes/PreloadScene";

const config = {
    transparent: false,
    antialiasGL: false,
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    backgroundColor: 0x27c2a7,
    input: {
        mouse: {
            preventDefaultWheel: false,
        },
    },
    scale: {
        parent: "phaser-game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    antialias: true,
    scene: [PreloadScene, BootScene, MainScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
