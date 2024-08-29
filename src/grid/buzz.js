import { on } from "../hardware/bus.js";
import { colorMap, transparent, print, text } from "../hardware/screen.js";
// Coffee = Buzz
// Buzz = Code
export const drawBuzz = (dur, amt = 0) => {
    print(0, 38, colorMap.code, transparent, 1, 0xc4); // Coffee
    text((`:${amt}`).padEnd(4), 1, 38, colorMap.code);
};
export default drawBuzz;
