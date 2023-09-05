const FRAME_WIDTH = 6;
const FRAME_COLOR = 0x3deb34;

export class CellView extends Phaser.GameObjects.Container {
    #frame; // Image
    #diamond; // image | null
    #hasDiamond; // boolean
    #uuid; // string
    #w; // number
    #h; // number

    constructor(scene, config) {
        super(scene);
        this.#hasDiamond = config.hasDiamond;
        this.#uuid = config.uuid;
        this.#w = config.width;
        this.#h = config.height;

        this.#build(config);
    }

    get uuid() {
        return this.#uuid;
    }

    showFrame() {
        this.#frame.alpha = 1;
    }

    hideFrame() {
        this.#frame.alpha = 0;
    }

    removeDiamond() {
        this.#hasDiamond = false;
        const scaleDown = this.scene.tweens.add({
            targets: this.#diamond,
            scale: { value: 0 },
            duration: 100,
            paused: true,
            onComplete: () => this.#diamond.destroy(),
        });
        this.scene.tweens.add({
            targets: this.#diamond,
            scale: { value: 1.3 },
            duration: 100,
            onComplete: () => scaleDown.play(),
        });
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
        this.#frame.alpha = 0;
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
