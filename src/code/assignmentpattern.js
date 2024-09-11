import Pattern from "./pattern.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const AssignmentPattern = Invocation("AssignmentPattern", [Pattern], [
    ["left", null], // ArrayPattern, Identifier, ObjectPattern
    ["right", null], // Expression, Literal, Identifier
]);
export default AssignmentPattern;