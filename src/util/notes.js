import stripe from "./stripe.js";

export const notes = (root = 13, a = 432) => stripe(8 * root, x => a * 2**((x - (4 * root)) / root));
export default notes;