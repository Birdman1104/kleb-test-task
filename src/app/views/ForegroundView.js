import { GameState, POPUP_SHOW_DURATION } from "../../config/constants";
import { GameModelEvents } from "../../events/ModelEvents";
import GlobalEmitter from "../../utils/EventEmitter";
import { WinPopup } from "./WinPopup";

export class ForegroundView extends Phaser.GameObjects.Container {
    #blocker; // image
    #winPopup; // WinPopup

    constructor(scene) {
        super(scene);
        this.#build();

        GlobalEmitter.on(GameModelEvents.StateUpdate, this.#onGameStateUpdate, this);
    }

    #build() {
        this.#buildBlocker();
        const { width: w, height: h } = this.scene.scale;
        this.#winPopup = new WinPopup(this.scene);
        this.#winPopup.setPosition(w / 2, h / 2);
        this.add(this.#winPopup);
    }

    #buildBlocker() {
        const { width: w, height: h } = this.scene.scale;
        this.#generateBlockerImage(w, h);
        this.#blocker = this.scene.add.image(w / 2, h / 2, "blocker");
        this.#blocker.setInteractive();
        this.#blocker.setAlpha(0);
        this.add(this.#blocker);
    }

    #showBlocker() {
        this.scene.tweens.add({
            targets: this.#blocker,
            alpha: 0.7,
            duration: POPUP_SHOW_DURATION,
        });
    }

    #hideBlocker() {
        this.scene.tweens.add({
            targets: this.#blocker,
            alpha: 0,
            duration: POPUP_SHOW_DURATION,
        });
    }

    #onGameStateUpdate(newState) {
        switch (newState) {
            case GameState.Win:
                this.scene.time.delayedCall(500, () => {
                    this.#showBlocker();
                    this.#winPopup.show();
                });
                break;
            case GameState.Game:
                this.#hideBlocker();
                this.#winPopup.hide();
                break;

            default:
                break;
        }
    }

    #generateBlockerImage(w, h) {
        const gr = this.scene.make.graphics({ x: 0, y: 0, add: false });
        gr.lineStyle(1, 0x000000, 1);
        gr.beginPath();
        gr.moveTo(0, 0);
        gr.lineTo(w, 0);
        gr.lineTo(w, h);
        gr.lineTo(0, h);
        gr.lineTo(0, 0);
        gr.closePath();
        gr.fill();
        gr.generateTexture("blocker", w, h);
        gr.destroy();
    }
}
