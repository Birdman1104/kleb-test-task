import { CounterView } from "./CounterView";

export class UIView extends Phaser.GameObjects.Container {
    #counter; // CounterView
    #tutorial; // Text
    constructor(scene) {
        super(scene);
        this.#build();
    }

    #build() {
        this.#buildCounter();
        this.#buildTutorial();
    }

    #buildCounter() {
        this.#counter = new CounterView(this.scene);
        const { width: cw, height: ch } = this.#counter.getBounds();
        const { width: gw } = this.scene.scale;
        this.#counter.x = gw - cw / 2 - 10;
        this.#counter.y = ch / 2 + 50;
        this.add(this.#counter);
    }

    #buildTutorial() {
        // const { width: cw, height: ch } = this.#counter.getBounds();
        const text = `1) Navigate using%%arrows on your%%keyboard.%%2) Press "Enter"%%to collect diamonds.%%3) The goal is%%to collect%%all the diamonds.%%4) The game is%%only on landscape%%mode.`;
        const textConfig = {
            fontSize: 32,
            color: "#000000",
            wordWrap: { callback: (text) => text.split("%%") },
        };
        this.#tutorial = this.scene.add.text(15, 50, text, textConfig);
        this.add(this.#tutorial);
    }
}
