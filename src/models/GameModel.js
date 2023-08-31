import GlobalEmitter from "../GlobalEmitter.js";
import { GameModelEvents } from "../events/ModelEvents.js";
import ObservableModel from "./ObservableModel.js";

export class GameModel extends ObservableModel {
    #score; // number

    constructor() {
        super("GameModel");
    }

    get score() {
        return this.#score;
    }

    set score(value) {
        if (value === this.#score) return;
        GlobalEmitter.emit(GameModelEvents.ScoreUpdate, value, this.#score, this.uuid);
        this.#score = value;
    }

    initialize() {
        //
    }
}
