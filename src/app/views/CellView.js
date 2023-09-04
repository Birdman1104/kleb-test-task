export class CellView extends Phaser.GameObjects.Container {
    #config; // CellModel

    constructor(scene, config) {
        super(scene);
        this.#config = config;
        this.#build();
    }

    #build() {
        const { width, height } = this.#config;
        const gr = this.scene.add.rectangle(width / 2, height / 2, width, height, Math.random() * 0xffffff);
        this.add(gr);
    }
}
