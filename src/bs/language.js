import split from "../util/split.js";
import upper from "../util/upper.js";
import lower from "../util/lower.js";
export const words = split(``);
export const wordsUpper = map(words, upper);
export const wordsLower = map(words, lower);
export default words;