import Statement from "./statement.js";
import Invocation from "../bs/invocation.js";
export const WhileStatement = Invocation("WhileStatement", [Statement], [
    ["test", null], // Expression, Identifier, Literal
    ["body", null], // BlockStatement
]);
export default WhileStatement;