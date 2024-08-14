export const stripe = (l = 0, fn = x => x) => new Array(l).fill(0).map((x, i) => i).map(fn);
export default stripe;