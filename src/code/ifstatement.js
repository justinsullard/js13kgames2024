import Statement from "./statement.js";
import Evil from "../bs/evil.js";
import Invocation from "../bs/invocation.js";
export const IfStatement = Invocation("IfStatement", [Statement], [
    ["test", null], // Expression, Identifier
    ["consequent", null], // BlockStatement
    ["alternate", null], // BlockStatement, IfStatement
]);
export default IfStatement;