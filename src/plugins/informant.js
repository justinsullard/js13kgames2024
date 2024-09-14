import { colorMap, transparent, print, text } from "../hardware/screen.js";
const { hardware, pickup } = colorMap;
const t = 44;
const l = 50;
export const drawInformant = () => {
    const energy = 0;
    print(l, t, hardware, transparent, 1, 0xc0); // Virtual Core
    print(l + 1, t, pickup, transparent, 1, 0xc3); // Plugin Key
    print(l + 2, t, hardware, transparent, 1, 0xb3); // Informant Plugin
    print(l + 3, t, hardware, transparent, 1, 0xd8 + energy); // Wire
    text("Informant", l + 4, t, hardware);
    // viewer
    // info
};
export default drawInformant;
