import map from "./map.js";
export const stripe = (l = 0, fn = x => x) => map(map(new Array(l).fill(0),(x, i) => i), fn);
export default stripe;