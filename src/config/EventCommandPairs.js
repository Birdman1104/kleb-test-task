import { ControllerEvents, GameViewEvents, MainSceneEvents, WinPopupEvents } from "../events/ViewEvents";
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
    selectedCell.hasDiamond ? removeDiamondFromCellCommand() : GlobalEmitter.emit(ControllerEvents.WrongClick);
};

const removeDiamondFromCellCommand = () => {
    Head.gameModel.board.removeSelectedCellDiamond();
    Head.gameModel.increaseScore();
};

const onPlayButtonClickCommand = () => {
    Head.gameModel.restart();
};

export const eventCommandPairs = [
    {
        event: MainSceneEvents.Ready,
        command: mainSceneReadyCommand,
    },
    {
        event: GameViewEvents.UpArrowDown,
        command: onUpArrowDownCommand,
    },
    {
        event: GameViewEvents.DownArrowDown,
        command: onDownArrowDownCommand,
    },
    {
        event: GameViewEvents.LeftArrowDown,
        command: onLeftArrowDownCommand,
    },
    {
        event: GameViewEvents.RightArrowDown,
        command: onRightArrowDownCommand,
    },
    {
        event: GameViewEvents.EnterButtonDown,
        command: onEnterButtonDownCommand,
    },
    {
        event: WinPopupEvents.PlayButtonClick,
        command: onPlayButtonClickCommand,
    },
];
