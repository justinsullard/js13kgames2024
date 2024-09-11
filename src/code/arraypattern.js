import Pattern from "./pattern.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const ArrayPattern = Invocation("ArrayPattern", [Pattern], [
    ["elements", []], // Identifier, RestElement
]);
export default ArrayPattern