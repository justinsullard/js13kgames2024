import Pattern from "./pattern.js";
import Invocation from "../bs/invocation.js";
export const ObjectPattern = Invocation("ObjectPattern", [Pattern], [
    ["properties", []], // ObjectProperty, RestElement
]);
export default ObjectPattern;