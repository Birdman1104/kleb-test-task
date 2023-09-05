import { CounterView } from "./CounterView";

export class UIView extends Phaser.GameObjects.Container {
    #counter; // CounterView
    constructor(scene) {
        super(scene);
        this.#build();
    }

    #build() {
        this.#buildCounter();
    }

    #buildCounter() {
        this.#counter = new CounterView(this.scene);
        const { width: cw, height: ch } = this.#counter.getBounds();
        const { width: gw } = this.scene.scale;
        this.#counter.x = gw - cw / 2 - 10;
        this.#counter.y = ch / 2 + 50;
        this.add(this.#counter);
    }
}
