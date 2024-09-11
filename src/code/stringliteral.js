import Literal from "./literal.js";
import Invocation from "../bs/invocation.js";
export const StringLiteral = Invocation("StringLiteral", [Literal], [
    ["value", null], // string
]);
export default StringLiteral;