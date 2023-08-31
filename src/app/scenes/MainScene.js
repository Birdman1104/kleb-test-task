import { Scenes } from "../../config/constants";
import { MainView } from "../views/MainView";

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: Scenes.Main });
    }

    create() {
        this.#buildMainView();
    }

    #buildMainView() {
        const mainView = new MainView(this);
        this.add.existing(mainView);
    }
}
