import { colorMap, transparent, print } from "../hardware/screen.js";
export const drawDumpsterFire = (dur, amt = 0) => print(79, 59, colorMap.exception, transparent, 1, 0xec);
export default drawDumpsterFire;
