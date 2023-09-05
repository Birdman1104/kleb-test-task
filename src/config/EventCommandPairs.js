import { BoardViewEvents, MainSceneEvents } from "../events/ViewEvents";
import { Head } from "../models/Head";

const mainSceneReadyCommand = () => {
    Head.initialize();
};

const onUpArrowDownCommand = () => {
    Head.gameModel.board.moveSelectionUp();
};

const onDownArrowDownCommand = () => {
    Head.gameModel.board.moveSelectionDown();
};

const onLeftArrowDownCommand = () => {
    Head.gameModel.board.moveSelectionLeft();
};

const onRightArrowDownCommand = () => {
    Head.gameModel.board.moveSelectionRight();
};

export const eventCommandPairs = [
    {
        event: MainSceneEvents.Ready,
        command: mainSceneReadyCommand,
    },
    {
        event: BoardViewEvents.UpArrowDown,
        command: onUpArrowDownCommand,
    },
    {
        event: BoardViewEvents.DownArrowDown,
        command: onDownArrowDownCommand,
    },
    {
        event: BoardViewEvents.LeftArrowDown,
        command: onLeftArrowDownCommand,
    },
    {
        event: BoardViewEvents.RightArrowDown,
        command: onRightArrowDownCommand,
    },
];
