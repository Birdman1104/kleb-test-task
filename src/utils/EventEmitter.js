import { eventCommandPairs } from "../config/EventCommandPairs.js";

class ExtendedEmitter extends Phaser.Events.EventEmitter {
    mapCommands() {
        eventCommandPairs.forEach(({ event, command }) => {
            this.on(event, command);
        });
    }
    unMapCommands() {
        eventCommandPairs.forEach(({ event, command }) => {
            this.off(event, command);
        });
    }
}

const GlobalEmitter = new ExtendedEmitter();

export default GlobalEmitter;
