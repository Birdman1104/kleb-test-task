import { assets } from "../../assets/assetsNames/assets";
import { atlases } from "../../assets/assetsNames/atlas";
import { audioAssets } from "../../assets/assetsNames/audio";
import { Scenes } from "../../config/constants";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: Scenes.Preload });
    }

    preload() {
        //
    }

    create() {
        this.#loadAtlases();
        this.#loadImages();
        this.#loadAudio();

        this.load.on("progress", this.#onFileLoadComplete, this);
        this.load.on("complete", this.#onLoadComplete, this);
        this.load.start();
    }

    #loadAtlases() {
        if (atlases.length === 0) return;
        atlases.forEach(({ name, png, json }) => this.load.atlas(name, `src/${png}`, `src/${json}`));
    }

    #loadImages() {
        if (assets.length === 0) return;
        assets.forEach(({ name, path }) => this.load.image(name, `src/${path}`));
    }

    #loadAudio() {
        if (audioAssets.length === 0) return;
        audioAssets.forEach(({ name, path }) => this.load.audio(name, path));
    }

    #onFileLoadComplete(progress) {
        console.log("LOAD_PROGRESS", progress);
    }

    #onLoadComplete() {
        this.game.scene.stop(Scenes.Preload);
        this.game.scene.start(Scenes.Boot);
    }
}
