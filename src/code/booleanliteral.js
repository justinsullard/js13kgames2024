import Literal from "./literal.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const BooleanLiteral = Invocation("BooleanLiteral", [Literal], [
    ["value", false], // boolean
]);
export default BooleanLiteral;