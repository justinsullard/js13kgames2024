import bus from "../hardware/bus.js";
import { colorMap, transparent } from "../hardware/screen.js";
const { buzz, hardware, pickup } = colorMap;

// Key Controls
let enabled = false;
bus.on("enable@keycontrols", x => enabled = true);
bus.on("disable@keycontrols", x => enabled = false);

const keys = {};
bus.on("keydown", ({key}) => keys[key] = true);
bus.on("keyup", ({key}) => keys[key] = false);

const t = 40;
const l = 50;

bus.on("draw@keycontrols", (dur) => {
    if (!enabled) { return; }
    const energy = Object.values(keys).find(x => x) ? Math.random() * 7 | 0 : 0;
    bus.emit("print@screen", l, t, keys.Escape ? buzz : hardware, transparent, 1, 0x1b); // Esc
    bus.emit("print@screen", l + 1, t + 1, keys[" "] ? buzz : hardware, transparent, 1, 0xe5); // Spacebar
    bus.emit("print@screen", l + 2, t, keys.Shift ? buzz : hardware, transparent, 1, 0xe6); // Shift
    bus.emit("print@screen", l + 6, t, keys.Enter ? buzz : hardware, transparent, 1, 0xe7); // Enter
    bus.emit("print@screen", l + 4, t, keys.ArrowUp ? buzz : hardware, transparent, 1, 0xe1); // ArrowUp
    bus.emit("print@screen", l + 3, t + 1, keys.ArrowLeft ? buzz : hardware, transparent, 1, 0xe2); // ArrowLeft
    bus.emit("print@screen", l + 4, t + 1, keys.ArrowDown ? buzz : hardware, transparent, 1, 0xe3); // ArrowDown
    bus.emit("print@screen", l + 5, t + 1, keys.ArrowRight ? buzz : hardware, transparent, 1, 0xe4); // ArrowRight

    bus.emit("print@screen", l + 8, t, hardware, transparent, 1, 0xc0); // Virtual Core
    bus.emit("print@screen", l + 9, t, pickup, transparent, 1, 0xc3); // Plugin Key
    bus.emit("print@screen", l + 10, t, hardware, transparent, 1, 0xe0); // Key Control Plugin
    bus.emit("print@screen", l + 11, t, hardware, transparent, 1, 0xd8 + energy); // Wire
    bus.emit("text@screen", "Key Control", l + 12, t, hardware);
});
// Top is 39
// const w = 49;
// const h = 20;
