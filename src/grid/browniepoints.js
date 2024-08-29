// Brownie Points
import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
export const drawBrowniePoints = (dur, amt = 0) => {
    print(18, 38, colorMap.pickup, transparent, 1, 0xc5); // Brownie Point
    text((`:${amt}`).padEnd(4), 19, 38, colorMap.pickup);
};
export default drawBrowniePoints;
