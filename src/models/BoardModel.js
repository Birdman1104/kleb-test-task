import { COLS, ROWS } from "../config/constants.js";
import { BoardModelEvents } from "../events/ModelEvents.js";
import GlobalEmitter from "../utils/EventEmitter.js";
import { getEmpty2DArray } from "../utils/utils.js";
import { CellModel } from "./CellModel.js";
import Model from "./Model.js";

export class BoardModel extends Model {
    #cells; // CellModel[][]

    constructor() {
        super("BoardModel");
    }

    get cells() {
        return this.#cells;
    }

    set cells(value) {
        if (value === this.#cells) return;
        GlobalEmitter.emit(BoardModelEvents.CellsUpdate, value, this.#cells, this._uuid);
        this.#cells = value;
    }

    initialize(diamondCount) {
        this.#initCells(diamondCount);
    }

    #initCells(diamondCount) {
        const arr = getEmpty2DArray(COLS, ROWS);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j] = new CellModel(i, j);
            }
        }

        for (let n = 0; n < diamondCount; n++) {
            this.#placeDiamonds(arr);
        }

        this.cells = arr;
    }

    #placeDiamonds(arr) {
        let i = Math.floor(Math.random() * arr.length);
        let j = Math.floor(Math.random() * arr[0].length);
        const cell = arr[i][j];

        cell.hasDiamond ? this.#placeDiamonds(arr) : (cell.hasDiamond = true);
    }
}
