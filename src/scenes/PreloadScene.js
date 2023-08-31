import { Scenes } from "../constants";

export class PreloadScene extends Phaser.Scene {
    preload() {
        //
    }

    create() {
        this.load.image("logo.png", "src/assets/logo.png");
        this.load.image("particle.png", "src/assets/particle.png");

        this.load.on("progress", this.#onFileLoadComplete, this);
        this.load.on("complete", this.#onLoadComplete, this);
        this.load.start();
    }

    #onFileLoadComplete(progress) {
        console.log("LOAD_PROGRESS", progress);
    }

    #onLoadComplete() {
        this.game.scene.stop(Scenes.Preload);
        this.game.scene.start(Scenes.Boot);
    }
}
