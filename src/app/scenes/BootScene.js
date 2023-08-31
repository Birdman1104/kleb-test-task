import { Scenes } from "../../config/constants";

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: Scenes.Boot });
    }

    preload() {
        //
    }

    create() {
        this.game.scene.stop(Scenes.Boot);
        this.game.scene.start(Scenes.Main);
    }
}
