import Literal from "./literal.js";
import Invocation from "../bs/invocation.js";
export const RegExpLiteralFlag = /^[igm]$/;
export const RegExpLiteral = Invocation("RegExpLiteral", [Literal], [
    ["pattern", null], // string
    ["flags", null], // string
]);
export default RegExpLiteral;