import { on, off, emit} from "../hardware/bus.js";
import { open } from "../util/storage.js";
import each from "../util/each.js";
import drawDumpsterFire from "./dumpsterfire.js";
import { logConsole, drawConsole } from "./console.js";
import drawKeyControls from "../plugins/keycontrols.js";
import drawInformant from "../plugins/informant.js";
import drawBuzz from "./buzz.js";
import drawErrors from "./errors.js";
import drawBrowniePoints from "./browniepoints.js";
import drawWarnings from "./warnings.js";
import { cursortrauma, drawCursor } from "../hardware/cursor.js";
import drawLoc from "./loc.js";
import speak from "../hardware/voice.js";
import { max, min, random } from "../util/math.js";
let repo = null;
let user = null;
on("update@user", x => user = x);
// Main Menu
let cursor = [0, 0];
const move = {
    Left: () => cursor[0] = max(0, cursor[0] - 1),
    Right: () => cursor[0] = min(36, cursor[0] + 1),
    Up: () => cursor[1] = max(0, cursor[1] - 1),
    Down: () => cursor[1] = min(36, cursor[1] + 1),
};
const keydown = ({ key }) => {
    const dir = move[key.split("Arrow").pop()];
    if (dir) {
        dir();
        cursortrauma(2 + random() * 2.5);
    }
};
on("open@mainmenu", () => {
    repo = open("repo");
    emit("melody@speaker", "codetastrophy");
    logConsole("½ Main Menu");
    speak("Main Menu");
    on("keydown", keydown);
});
on("close@mainmenu", () => {
    current = null;
    queue.splice(0, queue.length);
    off("keydown", keydown);
});

// function MainMenu(you) {
//     if (you.areNotScared) return currentRepo.continue();î
//     if (you.areAQuiter) return new Repo();î
//     if (you.areConfused) return ReadMe();î
//     if (you.wantToGloat) return Achievements();î
// }

export const drawMainMenu = (dur) => {
    drawConsole(dur);
    drawKeyControls(dur);
    drawInformant(dur);
    drawBuzz(dur, 13);
    drawErrors(dur, 0);
    drawWarnings(dur, 0);
    drawBrowniePoints(dur, 0);
    drawDumpsterFire(dur);
    drawCursor(dur, 4 + cursor[0], 1 + cursor[1]);
    drawLoc(dur, ...cursor);
};
export default drawMainMenu;
