import bus from "../hardware/bus.js";
import { colorMap } from "../hardware/screen.js";
const { comment } = colorMap;
const t = 38;
const l = 27;

bus.on("draw@loc", (dur, x, y) => {
    bus.emit("text@screen", (`ln:${y + 1} col:${x + 1}`).padEnd(14, " "), l, t, comment);
});