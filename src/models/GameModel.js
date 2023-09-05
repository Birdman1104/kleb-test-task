import { GameState, getDiamondCount } from "../config/constants.js";
import { GameModelEvents } from "../events/ModelEvents.js";
import GlobalEmitter from "../utils/EventEmitter";
import { BoardModel } from "./BoardModel.js";
import Model from "./Model.js";

export class GameModel extends Model {
    #state = GameState.Unknown;
    #board; // BoardModel
    #score; // number
    #diamondCount; // number

    constructor() {
        super("GameModel");
    }

    get state() {
        return this.#state;
    }

    set state(value) {
        if (value === this.#state) return;
        GlobalEmitter.emit(GameModelEvents.StateUpdate, value, this.#state, this.uuid);
        this.#state = value;
    }

    get diamondCount() {
        return this.#diamondCount;
    }

    set diamondCount(value) {
        if (value === this.#diamondCount) return;
        GlobalEmitter.emit(GameModelEvents.DiamondCountUpdate, value, this.#diamondCount, this.uuid);
        this.#diamondCount = value;
    }

    get score() {
        return this.#score;
    }

    set score(value) {
        if (value === this.#score) return;
        GlobalEmitter.emit(GameModelEvents.ScoreUpdate, value, this.#score, this.uuid);
        this.#score = value;
    }

    get board() {
        return this.#board;
    }

    set board(value) {
        if (value === this.#board) return;
        GlobalEmitter.emit(GameModelEvents.BoardUpdate, value, this.#board, this.uuid);
        this.#board = value;
    }

    increaseScore() {
        this.score += 1;
        if (this.score === this.diamondCount) {
            this.state = GameState.Win;
        }
    }

    initialize() {
        this.state = GameState.Game;
        this.score = 0;
        this.diamondCount = getDiamondCount();
        this.board = new BoardModel();
        this.board.initialize(this.diamondCount);
    }

    restart() {
        this.#board.destroy();
        this.#board = null;
        this.initialize();
    }
}
