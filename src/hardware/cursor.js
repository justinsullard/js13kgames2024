import { move, update } from "./screen.js";
import { max, min } from "../util/math.js";
let char = 208;
let trauma = 0;

export const drawCursor = (dur, x = -2, y = -2) => {
    const offset = (dur / 240) % 2 | 0;
    update(257, trauma ? 209 + trauma | 0 : char + offset);
    move(257, x / 40, -y / 30);
    trauma = max(0, trauma - 0.125);
};
export const cursortrauma = (x = 1) => trauma = max(0, min(7, x));
