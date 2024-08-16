import stripe from "./stripe.js";
import sort from "./sort.js";

export const euclidean = (nodes = 0, offset = 0, base = 13) => {
    let move = nodes ? base / nodes : 0;
    return sort(stripe(nodes, x => (((x * move) + offset + base) | 0) % base));
};
export default euclidean;