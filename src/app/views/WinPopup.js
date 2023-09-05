import { POPUP_SHOW_DURATION } from "../../config/constants";
import { WinPopupEvents } from "../../events/ViewEvents";
import GlobalEmitter from "../../utils/EventEmitter";

export class WinPopup extends Phaser.GameObjects.Container {
    #background; // image
    #playButton; // image

    constructor(scene) {
        super(scene);
        this.#build();
    }

    show() {
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: POPUP_SHOW_DURATION,
            onComplete: () => {
                this.#playButton.setInteractive();
            },
        });
    }

    hide(force = false) {
        this.#playButton.disableInteractive();
        if (force) {
            this.alpha = 0;
        } else {
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                duration: POPUP_SHOW_DURATION,
            });
        }
    }

    #build() {
        this.#buildBackground();
        this.#buildButton();
        this.hide(true);
    }

    #buildBackground() {
        this.#background = this.scene.add.image(0, 0, "main", "popup.png");
        this.#background.setOrigin(0.5);
        this.add(this.#background);
    }

    #buildButton() {
        this.#playButton = this.scene.add.image(
            this.#background.x,
            this.#background.y + 30,
            "main",
            "play_round_btn.png",
        );
        this.#playButton.setOrigin(0.5);

        this.#playButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.#playButton.disableInteractive();
            GlobalEmitter.emit(WinPopupEvents.PlayButtonClick);
        });
        this.add(this.#playButton);
    }
}
