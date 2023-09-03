import { MainSceneEvents } from "../events/ViewEvents";
import { Head } from "../models/Head";

const mainSceneReadyCommand = () => {
    Head.initialize();
};

export const eventCommandPairs = [
    {
        event: MainSceneEvents.Ready,
        command: mainSceneReadyCommand,
    },
];
