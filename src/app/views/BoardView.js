import { COLS, ROWS } from "../../config/constants";
import { BoardModelEvents } from "../../events/ModelEvents";
import GlobalEmitter from "../../utils/EventEmitter";
import { getEmpty2DArray } from "../../utils/utils";
import { CellView } from "./CellView";

export class BoardView extends Phaser.GameObjects.Container {
    #cells; // CellView[][]
    #boardImage; // Sprite
    #cellWidth; // number
    #cellHeight; // number

    constructor(scene) {
        super(scene);
        this.#build();
        GlobalEmitter.on(BoardModelEvents.CellsUpdate, this.#cellsUpdate, this);
    }

    #build() {
        this.#buildBoardImage();
    }

    #buildBoardImage() {
        const { width: w, height: h } = this.scene.scale;
        this.#boardImage = this.scene.add.image(w / 2, h / 2, "main", "board.png");
        const { width: iw, height: ih } = this.#boardImage;
        const gr = this.scene.add.rectangle(w / 2, h / 2, iw, ih, 0xa87327);
        this.#cellHeight = ih / ROWS;
        this.#cellWidth = iw / COLS;
        this.add(gr);
        this.add(this.#boardImage);
        console.warn(this.#cellHeight, this.#cellWidth);
    }

    #cellsUpdate(newValue, oldValue) {
        if (newValue && !oldValue) this.#buildCells(newValue);
    }

    #buildCells(cellsConfig) {
        const startX = this.#boardImage.x - this.#boardImage.width / 2;
        const startY = this.#boardImage.y - this.#boardImage.height / 2;
        const arr = getEmpty2DArray(COLS, ROWS);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                const config = cellsConfig[i][j];
                config.width = this.#cellWidth;
                config.height = this.#cellHeight;
                config.x = startX + i * this.#cellWidth;
                config.y = startY + j * this.#cellHeight;
                const cell = new CellView(this.scene, config);
                arr[i][j] = cell;
                cell.x = config.x;
                cell.y = config.y;
                this.add(cell);
            }
        }

        this.#cells = arr;
    }
}
