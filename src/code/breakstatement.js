import Statement from "./statement.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const BreakStatement = Invocation("BreakStatement", [Statement], [
    ["label", null], // string
]);
export default BreakStatement;