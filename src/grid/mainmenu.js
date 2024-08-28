import { on, off, emit} from "../hardware/bus.js";
import { open } from "../util/storage.js";
import each from "../util/each.js";
let repo = null;
let user = null;
on("update@user", x => user = x);
// Main Menu
let cursor = [0, 0];
const move = {
    Left: () => cursor[0] = Math.max(0, cursor[0] - 1),
    Right: () => cursor[0] = Math.min(36, cursor[0] + 1),
    Up: () => cursor[1] = Math.max(0, cursor[1] - 1),
    Down: () => cursor[1] = Math.min(36, cursor[1] + 1),
};
const keydown = ({ key }) => {
    const dir = move[key.split("Arrow").pop()];
    if (dir) {
        dir();
        emit("trauma@cursor", 2 + Math.random() * 2.5);
    }
};
const components = [
    "buzz",
    "errors",
    "warnings",
    "browniepoints",
    "clock",
    "loc",
    "console",
    "keyboard",
    "keycontrols",
    "informant",
    "dumpsterfire",
    "cursor",
];
on("open@mainmenu", () => {
    repo = open("repo");
    emit("melody@speaker", "codetastrophy");
    each(components, c => emit(`enable@${c}`));
    emit("log@console", "½ Main Menu");
    emit("@say", "Main Menu");
    on("keydown", keydown);
});
on("close@mainmenu", () => {
    current = null;
    queue.splice(0, queue.length);
    each(components, c => emit(`disable@${c}`));
    off("keydown", keydown);
});
// keyword("function")space()name("MainMenu")oparen()token(you)cparen()space()obrack()nl()
// pad(1)

// function MainMenu(you) {
//     if (you.areNotScared) return currentRepo.continue();\uEE
//     if (you.areAQuiter) return new Repo();\uEE
//     if (you.areConfused) return ReadMe();\uEE
//     if (you.wantToGloat) return Achievements();\uEE
// }

on("draw@mainmenu", (dur) => {
    // draw options
    // Continue Current Repo : if repo
    // Quit Current Repo : if repo
    // New Repo : if !repo
    // Readme
    // Achievements
    emit("draw@console", dur);
    emit("draw@keycontrols", dur);
    emit("draw@informant", dur);
    emit("draw@buzz", dur, 13);
    emit("draw@errors", dur, 0);
    emit("draw@warnings", dur, 0);
    emit("draw@browniepoints", dur, 0);
    emit("draw@dumpsterfire", dur);
    emit("draw@cursor", dur, 4 + cursor[0], 1 + cursor[1]);
    emit("draw@loc", dur, ...cursor);
});
