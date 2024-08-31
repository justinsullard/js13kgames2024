import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
import each from "../util/each.js";
import listen from "../util/listen.js";
import keys from "../util/keys.js";
import { random } from "../util/math.js";
import values from "../util/values.js"
import lower from "../util/lower.js";
const { buzz, hardware, pickup } = colorMap;

// Key Controls
const KEYS = {};
export const clearKeys = () => each(keys(KEYS), k => KEYS[k] = false);
on("@KEYS", () => console.log(JSON.stringify(KEYS, false, 2)));
// let enabled = false;
// export const enableKeyControls = () => {
//     enabled = true;
//     clearKeys();
// };
// export const disableKeyControls = () => {
//     enabled = false;
//     clearKeys();
// };

on("keydown", ({key}) => KEYS[lower(key)] = true);
on("keyup", ({key}) => KEYS[lower(key)] = false);
listen("visibilitychange", clearKeys, document);
listen("blur", clearKeys);
listen("focus", clearKeys);

const t = 40;
const l = 50;
export const drawKeyControls = (dur) => {
    // if (!enabled) { return; }
    const energy = values(KEYS).find(x => x) ? random() * 7 | 0 : 0;
    print(l, t, KEYS.escape ? buzz : hardware, transparent, 1, 0x1b); // Esc
    print(l + 1, t + 1, KEYS[" "] ? buzz : hardware, transparent, 1, 0xe5); // Spacebar
    print(l + 2, t, KEYS.shift ? buzz : hardware, transparent, 1, 0xe6); // Shift
    print(l + 6, t, KEYS.enter ? buzz : hardware, transparent, 1, 0xe7); // Enter
    print(l + 4, t, KEYS.arrowup ? buzz : hardware, transparent, 1, 0xe1); // ArrowUp
    print(l + 3, t + 1, KEYS.arrowleft ? buzz : hardware, transparent, 1, 0xe2); // ArrowLeft
    print(l + 4, t + 1, KEYS.arrowdown ? buzz : hardware, transparent, 1, 0xe3); // ArrowDown
    print(l + 5, t + 1, KEYS.arrowright ? buzz : hardware, transparent, 1, 0xe4); // ArrowRight

    print(l + 8, t, hardware, transparent, 1, 0xc0); // Virtual Core
    print(l + 9, t, pickup, transparent, 1, 0xc3); // Plugin Key
    print(l + 10, t, hardware, transparent, 1, 0xe0); // Key Control Plugin
    print(l + 11, t, hardware, transparent, 1, 0xd8 + energy); // Wire
    text("Key Controls", l + 12, t, hardware);
};
export default drawKeyControls;
