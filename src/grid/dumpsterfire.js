import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
on("draw@dumpsterfire", (dur, amt = 0) => {
    print(79, 59, colorMap.exception, transparent, 1, 0xec); // Dumpster Fire
});