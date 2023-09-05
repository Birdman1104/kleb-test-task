const FRAME_WIDTH = 6;
const FRAME_COLOR = 0x3deb34;

export class CellView extends Phaser.GameObjects.Container {
    #frame; // Image
    #diamond; // image | null
    #hasDiamond; // boolean
    #uuid; // string
    #i; // number
    #j; // number
    #w; // number
    #h; // number

    constructor(scene, config) {
        super(scene);
        console.warn(config);

        this.#hasDiamond = config.hasDiamond;
        this.#uuid = config.uuid;
        this.#i = config.i;
        this.#j = config.j;
        this.#w = config.width;
        this.#h = config.height;

        this.#build(config);
    }

    #build() {
        if (this.#hasDiamond) this.#buildDiamond();
        this.#buildFrame();
    }

    #buildDiamond() {
        this.#diamond = this.scene.add.image(this.#w / 2, this.#h / 2, "main", "crystal_yellow.png");
        this.add(this.#diamond);
    }

    #buildFrame() {
        this.#generateRectangle();
        this.#frame = this.scene.add.image(this.#w / 2, this.#h / 2, "frame");
        this.add(this.#frame);
    }

    #generateRectangle() {
        const gr = this.scene.make.graphics({ x: 0, y: 0, add: false });
        gr.lineStyle(FRAME_WIDTH, FRAME_COLOR, 1.0);
        gr.beginPath();
        gr.moveTo(0, 0);
        gr.lineTo(this.#w, 0);
        gr.lineTo(this.#w, this.#h);
        gr.lineTo(0, this.#h);
        gr.lineTo(0, 0);
        gr.closePath();
        gr.strokePath();
        gr.generateTexture("frame", this.#w, this.#h);
        gr.destroy();
    }
}
