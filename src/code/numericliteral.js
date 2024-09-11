import Literal from "./literal.js";
import Invocation from "../bs/invocation.js";
export const NumericLiteral = Invocation("NumericLiteral", [Literal], [
    ["value", null], // number
]);
export default NumericLiteral;