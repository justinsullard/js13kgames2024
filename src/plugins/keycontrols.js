import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
const { buzz, hardware, pickup } = colorMap;

// Key Controls
const keys = {};
const clearkeys = () => {
    Object.keys(keys).forEach(k => keys[k] = false);
    // console.log("Cleared keys due to visibility", keys, Object.values(keys).find(x => x) ? Math.random() * 7 | 0 : 0);
}
let enabled = false;
on("enable@keycontrols", x => {
    enabled = true;
    clearkeys();
});
on("disable@keycontrols", x => {
    enabled = false;
    clearkeys();
});

on("keydown", ({key}) => {
    keys[key] = true;
    // console.log("keydown", key);
});
on("keyup", ({key}) => {
    keys[key] = false;
    // console.log("keyup", key);
});
on("visibility", visible => {
    // console.log("visibilty", visible);
    clearkeys();
    // setTimeout(clearkeys, 100);
});

const t = 40;
const l = 50;

on("draw@keycontrols", (dur) => {
    if (!enabled) { return; }
    const energy = Object.values(keys).find(x => x) ? Math.random() * 7 | 0 : 0;
    print(l, t, keys.Escape ? buzz : hardware, transparent, 1, 0x1b); // Esc
    print(l + 1, t + 1, keys[" "] ? buzz : hardware, transparent, 1, 0xe5); // Spacebar
    print(l + 2, t, keys.Shift ? buzz : hardware, transparent, 1, 0xe6); // Shift
    print(l + 6, t, keys.Enter ? buzz : hardware, transparent, 1, 0xe7); // Enter
    print(l + 4, t, keys.ArrowUp ? buzz : hardware, transparent, 1, 0xe1); // ArrowUp
    print(l + 3, t + 1, keys.ArrowLeft ? buzz : hardware, transparent, 1, 0xe2); // ArrowLeft
    print(l + 4, t + 1, keys.ArrowDown ? buzz : hardware, transparent, 1, 0xe3); // ArrowDown
    print(l + 5, t + 1, keys.ArrowRight ? buzz : hardware, transparent, 1, 0xe4); // ArrowRight

    print(l + 8, t, hardware, transparent, 1, 0xc0); // Virtual Core
    print(l + 9, t, pickup, transparent, 1, 0xc3); // Plugin Key
    print(l + 10, t, hardware, transparent, 1, 0xe0); // Key Control Plugin
    print(l + 11, t, hardware, transparent, 1, 0xd8 + energy); // Wire
    text("Key Controls", l + 12, t, hardware);
});