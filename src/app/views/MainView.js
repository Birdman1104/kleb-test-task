import { BackgroundView } from "./BackgroundView";
import { ForegroundView } from "./ForegroundView";
import { GameView } from "./GameView";
import { UIView } from "./UIView";

export class MainView extends Phaser.GameObjects.Container {
    #backgroundView; // BackgroundView
    #gameView; // GameView
    #uiView; // UIView
    #foregroundView; // ForegroundView

    constructor(scene) {
        super(scene);
        this.#build();
    }

    #build() {
        this.add((this.#backgroundView = new BackgroundView(this.scene)));
        this.add((this.#gameView = new GameView(this.scene)));
        this.add((this.#uiView = new UIView(this.scene)));
        this.add((this.#foregroundView = new ForegroundView(this.scene)));
    }
}
