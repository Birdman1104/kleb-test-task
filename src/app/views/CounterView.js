import { GameModelEvents } from "../../events/ModelEvents";
import GlobalEmitter from "../../utils/EventEmitter";

export class CounterView extends Phaser.GameObjects.Container {
    #background; // image
    #scoreText; // text
    #target = 0;
    #currentScore = 0;

    constructor(scene) {
        super(scene);
        this.#build();

        GlobalEmitter.on(GameModelEvents.DiamondCountUpdate, this.#onDiamondsCountUpdate, this);
        GlobalEmitter.on(GameModelEvents.ScoreUpdate, this.#onScoreUpdate, this);
    }

    getBounds() {
        const { width: w, height: h } = this.#background;
        const bounds = new Phaser.Geom.Rectangle(0, 0, w, h);
        return bounds;
    }

    #build() {
        this.#buildBackground();
        this.#buildScoreText();
    }

    #buildBackground() {
        this.#background = this.scene.add.image(0, 0, "main", "score_bar.png");
        this.add(this.#background);
    }

    #buildScoreText() {
        this.#scoreText = this.scene.add.text(40, 5, `0/0`, { fontSize: 48 });
        this.#scoreText.setOrigin(0.5);
        this.add(this.#scoreText);
    }

    #onDiamondsCountUpdate(newValue) {
        this.#target = newValue;
        this.#updateScoreText();
    }

    #onScoreUpdate(newValue) {
        this.#currentScore = newValue;
        this.#updateScoreText();
    }

    #updateScoreText() {
        this.#scoreText.text = `${this.#currentScore}/${this.#target}`;
    }
}
