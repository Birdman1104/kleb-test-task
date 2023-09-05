import { GameState } from "../../config/constants";
import { GameModelEvents } from "../../events/ModelEvents";
import { GameViewEvents } from "../../events/ViewEvents";
import GlobalEmitter from "../../utils/EventEmitter";
import { BoardView } from "./BoardView";

export class GameView extends Phaser.GameObjects.Container {
    #board; // BoardView
    #state; // GameState

    constructor(scene) {
        super(scene);
        this.#build();
        GlobalEmitter.on(GameModelEvents.BoardUpdate, this.#onBoardUpdate, this);
        GlobalEmitter.on(GameModelEvents.StateUpdate, this.#onGameStateUpdate, this);
    }

    #build() {
        this.#setInputHandlers();
    }

    #onBoardUpdate(newValue, oldValue) {
        if (newValue && !oldValue) this.#buildBoard();
    }

    #onGameStateUpdate(newValue) {
        this.#state = newValue;
    }

    #buildBoard() {
        this.#board?.destroy();
        this.#board = new BoardView(this.scene);
        this.add(this.#board);
    }

    #setInputHandlers() {
        const upArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const downArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const leftArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const enterButton = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        upArrow.on("down", () => this.#emitButtonEvent(GameViewEvents.UpArrowDown));
        downArrow.on("down", () => this.#emitButtonEvent(GameViewEvents.DownArrowDown));
        leftArrow.on("down", () => this.#emitButtonEvent(GameViewEvents.LeftArrowDown));
        rightArrow.on("down", () => this.#emitButtonEvent(GameViewEvents.RightArrowDown));
        enterButton.on("down", () => this.#emitButtonEvent(GameViewEvents.EnterButtonDown));
    }

    #emitButtonEvent(event) {
        if (!this.#board || this.#state !== GameState.Game) return;
        GlobalEmitter.emit(event);
    }
}
