import { on } from "../hardware/bus.js";
import { colorMap, text } from "../hardware/screen.js";
export const drawLoc = (dur, x, y) => {
    text((`ln:${y + 1} col:${x + 1}`).padEnd(14, " "), 27, 38, colorMap.comment);
};
export default drawLoc;
