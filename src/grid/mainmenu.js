import bus from "../hardware/bus.js";
import { open, save } from "../util/storage.js";
import { colorMap } from "../hardware/screen.js";
let repo = open("repo");
let user = null;
bus.on("update@user", x => user = x);
// Main Menu
let cursor = [0, 0];
const move = {
    Left: () => cursor[0] = Math.max(0, cursor[0] - 1),
    Right: () => cursor[0] = Math.min(37, cursor[0] + 1),
    Up: () => cursor[1] = Math.max(0, cursor[1] - 1),
    Down: () => cursor[1] = Math.min(37, cursor[1] + 1),
};
const keydown = ({ key }) => {
    const dir = move[key.split("Arrow").pop()];
    if (dir) {
        dir();
        bus.emit("trauma@cursor", 4);
    }
};

bus.on("open@mainmenu", () => {
    bus.emit("melody@speaker", "codetastrophy");
    bus.emit("enable@keyboard");
    bus.emit("enable@keycontrols");
    bus.emit("log@console", "Main Menu");
    bus.emit("@say", "Main Menu");
    bus.on("keydown", keydown);
});
bus.on("close@mainmenu", () => {
    current = null;
    queue.splice(0, queue.length);
    bus.emit("disable@keyboard");
    bus.emit("disable@keycontrols");
    bus.off("keydown", keydown);
});
bus.on("draw@mainmenu", (dur) => {
    // draw options
    // Continue Current Repo : if repo
    // Quit Current Repo : if repo
    // New Repo : if !repo
    // Readme
    // Achievements
    bus.emit("draw@console", dur);
    bus.emit("draw@keycontrols", dur);
    bus.emit("draw@cursor", dur, 4 + cursor[0], 1 + cursor[1]);
});
