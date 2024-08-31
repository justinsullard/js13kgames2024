import Literal from "./literal.js";
export const RegExpLiteralFlag = /^[igm]$/;
export default class RegExpLiteral extends Literal {
    pattern = null; // string
    flags = null; // string
}