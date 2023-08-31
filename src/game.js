import { Scenes } from "./config/constants";

export class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);

        this.#initializeScenes();
        this.scene.start(Scenes.Preload);
    }

    #initializeScenes() {
        //
    }
}
