import { Scenes } from "../../config/constants";
import { MainSceneEvents } from "../../events/ViewEvents";
import GlobalEmitter from "../../utils/EventEmitter";
import { MainView } from "../views/MainView";

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: Scenes.Main });
    }

    create() {
        GlobalEmitter.mapCommands();
        this.#buildMainView();
        GlobalEmitter.emit(MainSceneEvents.Ready);
    }

    #buildMainView() {
        const mainView = new MainView(this);
        this.add.existing(mainView);
    }
}
