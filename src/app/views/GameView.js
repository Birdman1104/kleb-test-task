import { GameModelEvents } from "../../events/ModelEvents";
import GlobalEmitter from "../../utils/EventEmitter";
import { BoardView } from "./BoardView";

export class GameView extends Phaser.GameObjects.Container {
    #board; // BoardView

    constructor(scene) {
        super(scene);
        this.#build();
        GlobalEmitter.on(GameModelEvents.BoardUpdate, this.#boardUpdate, this);
    }

    #build() {
        //
    }

    #boardUpdate(newValue, oldValue) {
        if (newValue && !oldValue) this.#buildBoard();
    }

    #buildBoard() {
        this.#board = new BoardView(this.scene);
        this.add(this.#board);
    }
}
