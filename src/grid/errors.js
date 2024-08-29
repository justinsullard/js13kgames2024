import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
export const drawErrors = (dur, amt = 0) => {
    print(6, 38, colorMap.smell, transparent, 1, 0xcc); // Errors
    text((`:${amt}`).padEnd(4), 7, 38, colorMap.smell);
};
export default drawErrors;
