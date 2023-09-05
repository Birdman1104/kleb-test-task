import { GameState } from "../config/constants";
import { CellModelEvents, GameModelEvents } from "../events/ModelEvents";
import { GameViewEvents } from "../events/ViewEvents";
import GlobalEmitter from "./EventEmitter";

export class SoundController extends Phaser.GameObjects.Container {
    #tap;
    #effect;
    #win;

    constructor(scene) {
        super(scene);
        this.#initAudio();

        GlobalEmitter.on(GameViewEvents.UpArrowDown, this.#playTap, this);
        GlobalEmitter.on(GameViewEvents.DownArrowDown, this.#playTap, this);
        GlobalEmitter.on(GameViewEvents.LeftArrowDown, this.#playTap, this);
        GlobalEmitter.on(GameViewEvents.RightArrowDown, this.#playTap, this);
        GlobalEmitter.on(CellModelEvents.HasDiamondUpdate, this.#diamondUpdate, this);
        GlobalEmitter.on(GameModelEvents.StateUpdate, this.#onGameStateUpdate, this);
    }

    #playTap() {
        this.#tap.play();
    }

    #diamondUpdate(hasDiamond) {
        console.warn(this.#effect);
        if (!hasDiamond) this.#effect.play();
    }

    #onGameStateUpdate(state) {
        if (state === GameState.Win) this.#win.play();
    }

    #initAudio() {
        this.#tap = this.scene.sound.add("tap");
        this.#effect = this.scene.sound.add("effect");
        this.#win = this.scene.sound.add("win");
    }
}
