import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
export const drawWarnings = (dur, amt = 0) => {
    print(12, 38, colorMap.exception, transparent, 1, 0xcb); // Warning
    text((`:${amt}`).padEnd(4), 13, 38, colorMap.exception);
};
export default drawWarnings;
