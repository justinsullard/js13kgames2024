import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const TryStatement = Invocation("TryStatement", [Statement], [
    ["block", null], // BlockStatement
    ["handler", null], // CatchClause
    ["finalizer", null], // null, BlockStatement
]);
export default TryStatement;