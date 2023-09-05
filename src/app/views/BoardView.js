import { COLS, ROWS } from "../../config/constants";
import { BoardModelEvents, CellModelEvents } from "../../events/ModelEvents";
import { BoardViewEvents } from "../../events/ViewEvents";
import GlobalEmitter from "../../utils/EventEmitter";
import { getEmpty2DArray } from "../../utils/utils";
import { CellView } from "./CellView";

export class BoardView extends Phaser.GameObjects.Container {
    #cells; // CellView[][]
    #selectedCell; // CellView
    #boardImage; // Sprite
    #cellWidth; // number
    #cellHeight; // number

    constructor(scene) {
        super(scene);
        this.#build();
        GlobalEmitter.on(BoardModelEvents.CellsUpdate, this.#cellsUpdate, this);
        GlobalEmitter.on(BoardModelEvents.SelectedCellUpdate, this.#selectedCellUpdate, this);
        GlobalEmitter.on(CellModelEvents.HasDiamondUpdate, this.#cellDiamondUpdate, this);
    }

    #build() {
        this.#buildBoardImage();
        this.#setInputHandlers();
    }

    #buildBoardImage() {
        const { width: w, height: h } = this.scene.scale;
        this.#boardImage = this.scene.add.image(w / 2, h / 2, "main", "board.png");
        const { width: iw, height: ih } = this.#boardImage;
        const gr = this.scene.add.rectangle(w / 2, h / 2, iw, ih, 0xa87327);
        this.#cellHeight = Math.ceil(ih / ROWS);
        this.#cellWidth = Math.ceil(iw / COLS);
        this.add(gr);
        this.add(this.#boardImage);
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

    #setInputHandlers() {
        const upArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const downArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const leftArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const rightArrow = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const enterButton = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        upArrow.on("down", () => GlobalEmitter.emit(BoardViewEvents.UpArrowDown));
        downArrow.on("down", () => GlobalEmitter.emit(BoardViewEvents.DownArrowDown));
        leftArrow.on("down", () => GlobalEmitter.emit(BoardViewEvents.LeftArrowDown));
        rightArrow.on("down", () => GlobalEmitter.emit(BoardViewEvents.RightArrowDown));
        enterButton.on("down", () => GlobalEmitter.emit(BoardViewEvents.EnterButtonDown));
    }

    #selectedCellUpdate(newSelectedCell) {
        this.#selectedCell?.hideFrame();
        this.#selectedCell = this.#getCellByUuid(newSelectedCell.uuid);
        this.#selectedCell.showFrame();
    }

    #cellDiamondUpdate(newValue, oldValue, uuid) {
        if (!this.#cells || this.#cells.length === 0) return;
        const cell = this.#getCellByUuid(uuid);
        if (!newValue) cell.removeDiamond();
    }

    #getCellByUuid(uuid) {
        for (let i = 0; i < this.#cells.length; i++) {
            for (let j = 0; j < this.#cells[i].length; j++) {
                if (this.#cells[i][j].uuid === uuid) return this.#cells[i][j];
            }
        }
    }
}
