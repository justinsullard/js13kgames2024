import bus from "../hardware/bus.js";
import { colorMap, transparent } from "../hardware/screen.js";
const { buzz, hardware, pickup } = colorMap;
let enabled = false;
bus.on("enable@informant", x => enabled = true);
bus.on("disable@informant", x => enabled = false);

const t = 42;
const l = 50;

bus.on("draw@informant", (dur) => {
    if (!enabled) { return; }
    const energy = 0;
    bus.emit("print@screen", l, t, hardware, transparent, 1, 0xc0); // Virtual Core
    bus.emit("print@screen", l + 1, t, pickup, transparent, 1, 0xc3); // Plugin Key
    bus.emit("print@screen", l + 2, t, hardware, transparent, 1, 0xb3); // Informant Plugin
    bus.emit("print@screen", l + 3, t, hardware, transparent, 1, 0xd8 + energy); // Wire
    bus.emit("text@screen", "Informant", l + 4, t, hardware);
});