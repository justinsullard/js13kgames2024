import { on } from "../hardware/bus.js";
import { colorMap, text } from "../hardware/screen.js";
on("draw@loc", (dur, x, y) => {
    text((`ln:${y + 1} col:${x + 1}`).padEnd(14, " "), 27, 38, colorMap.comment);
});