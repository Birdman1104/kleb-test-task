import { CellModelEvents } from "../events/ModelEvents.js";
import GlobalEmitter from "../utils/EventEmitter.js";
import Model from "./Model.js";

export class CellModel extends Model {
    #i; // number
    #j; // number
    #hasDiamond = false; // boolean

    constructor(i, j) {
        super("CellModel");

        this.#i = i;
        this.#j = j;
    }

    get i() {
        return this.#i;
    }

    get j() {
        return this.#j;
    }

    get hasDiamond() {
        return this.#hasDiamond;
    }

    set hasDiamond(value) {
        if (value === this.#hasDiamond) return;
        GlobalEmitter.emit(CellModelEvents.HasDiamondUpdate, value, this.#hasDiamond, this._uuid);
        this.#hasDiamond = value;
    }

    removeDiamond() {
        this.hasDiamond = false;
    }

    initialize() {
        //
    }
}
