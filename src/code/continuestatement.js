import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const ContinueStatement = Invocation("ContinueStatement", [Statement], [
    ["label", null], // null, Identifier
]);
export default ContinueStatement;