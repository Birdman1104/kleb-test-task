import { COLS, ROWS } from "../config/constants.js";
import { BoardModelEvents } from "../events/ModelEvents.js";
import GlobalEmitter from "../utils/EventEmitter.js";
import { getEmpty2DArray } from "../utils/utils.js";
import { CellModel } from "./CellModel.js";
import Model from "./Model.js";

export class BoardModel extends Model {
    #cells; // CellModel[][]
    #selectedCell; // CellModel

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

    get selectedCell() {
        return this.#selectedCell;
    }

    set selectedCell(value) {
        if (value === this.#selectedCell) return;
        GlobalEmitter.emit(BoardModelEvents.SelectedCellUpdate, value, this.#selectedCell, this._uuid);
        this.#selectedCell = value;
    }

    initialize(diamondCount) {
        this.#initCells(diamondCount);
        this.#setSelectedCell();
    }

    getCellByUuid(uuid) {
        for (let i = 0; i < this.#cells.length; i++) {
            for (let j = 0; j < this.#cells[i].length; j++) {
                if (this.#cells[i][j].uuid === uuid) return this.#cells[i][j];
            }
        }
    }

    moveSelectionUp() {
        let { i, j } = this.#selectedCell;
        const { length } = this.#cells[i];
        j -= 1;
        if (j < 0) {
            j = length - 1;
        } else if (j >= length) {
            j = 0;
        }
        this.selectedCell = this.#cells[i][j];
    }

    moveSelectionDown() {
        let { i, j } = this.#selectedCell;
        const { length } = this.#cells[i];
        j += 1;
        if (j < 0) {
            j = length - 1;
        } else if (j >= length) {
            j = 0;
        }
        this.selectedCell = this.#cells[i][j];
    }

    moveSelectionLeft() {
        let { i, j } = this.#selectedCell;
        const { length } = this.#cells;
        i -= 1;
        if (i < 0) {
            i = length - 1;
        } else if (i >= length) {
            i = 0;
        }
        this.selectedCell = this.#cells[i][j];
    }

    moveSelectionRight() {
        let { i, j } = this.#selectedCell;
        const { length } = this.#cells;
        i += 1;
        if (i < 0) {
            i = length - 1;
        } else if (i >= length) {
            i = 0;
        }
        this.selectedCell = this.#cells[i][j];
    }

    removeSelectedCellDiamond() {
        this.#selectedCell.removeDiamond();
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

    #setSelectedCell() {
        const midI = Math.floor(COLS / 2);
        const midJ = Math.floor(ROWS / 2);

        this.selectedCell = this.#cells[midI][midJ];
    }
}
