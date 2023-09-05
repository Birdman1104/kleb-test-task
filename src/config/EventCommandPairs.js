import { BoardViewEvents, ControllerEvents, MainSceneEvents } from "../events/ViewEvents";
import { Head } from "../models/Head";
import GlobalEmitter from "../utils/EventEmitter";

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

const onEnterButtonDownCommand = () => {
    const { selectedCell } = Head.gameModel.board;
    selectedCell.hasDiamond
        ? Head.gameModel.board.removeSelectedCellDiamond()
        : GlobalEmitter.emit(ControllerEvents.WrongClick);
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
    {
        event: BoardViewEvents.EnterButtonDown,
        command: onEnterButtonDownCommand,
    },
];
